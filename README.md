# 🅰️ Angular Version 21

## Signal Forms

A new generation of forms based on the signals API that solves the synchronization issues that plagued reactive forms. Signal forms offer guaranteed **type safety** and **reusability** through schemas, eliminating the verbose boilerplate of the past.

Check out the `newForm` and `oldForm` folders for a practical comparison between the two implementations.

---

## 🎯 Form Creation

### Traditional Approach (Reactive Forms)

With reactive forms, the form was declared separately from the data model. Keeping the `user` value synchronized with the form required additional code:

```typescript
// oldForm.ts
protected readonly user = signal<User>({
  firstName: 'pippo',
  lastName: 'pippi',
  email: 'pippo@email',
  notifyByEmail: false,
  reaction: '',
});

protected readonly signupForm = this.formBuilder.group({
  firstName: nonNullableRequired([Validators.minLength(5)]),
  lastName: nonNullableRequired([Validators.minLength(5)]),
  email: nonNullableRequired([Validators.email]),
  notifyByEmail: new FormControl(false, { nonNullable: true }),
  reaction: nonNullableRequired(),
});
```

### New Approach (Signal Forms)

Signal forms link directly to the data model. When the form is modified, the `user` signal automatically updates:

```typescript
// newForm.ts
protected readonly signupForm = form(
  this.user,
  ({ firstName, lastName, email, notifyByEmail, reaction }) => {
    apply(firstName, requiredTextMinLength);
    apply(lastName, requiredTextMinLength);
    required(email, {
      message: 'Field required',
      when: ({ valueOf }) => valueOf(notifyByEmail),
    });
    emailValidator(email, {
      message: 'Invalid email',
    });
    disabled(reaction, ({ valueOf }) => valueOf(firstName) === 'pippo');
    required(reaction);
  }
);
```

---

## 📝 Template Usage

### Reactive Forms

```html
<!-- oldForm.html -->
<form [formGroup]="signupForm" (submit)="onSubmit($event)">
  <div class="form-group">
    <label for="firstName">First Name</label>
    <input
      type="text"
      id="firstName"
      formControlName="firstName"
      placeholder="Enter your first name"
    />
    <app-old-form-error [fieldControl]="signupForm.controls.firstName" />
  </div>
  <!-- ... other fields ... -->
</form>
```

### Signal Forms

```html
<!-- newForm.html -->
<form (submit)="onSubmit($event)">
  <div class="form-group">
    <label for="firstName">First Name</label>
    <input
      type="text"
      id="firstName"
      [field]="signupForm.firstName"
      placeholder="Enter your first name"
    />
    <app-form-error [fieldControl]="signupForm.firstName()" />
  </div>
  <!-- ... other fields ... -->
</form>
```

---

## ✅ Validations

### Adding Validators

#### Reactive Forms

Validators are provided at creation time. To avoid duplication, helper functions are used:

```typescript
// oldForm.ts
export const nonNullableRequired = (validators: ValidatorFn[] = []) =>
  new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, ...validators],
  });
```

#### Signal Forms

Validators are applied inside the form creation callback with less verbosity:

```typescript
// newForm.ts - Reusable Schema
export const requiredTextMinLength: Schema<string> = schema((path) => {
  required(path, { message: 'Field is required' });
  minLength(path, 5, { message: 'Field must be more than 5 char' });
});

// Usage in form
protected readonly signupForm = form(
  this.user,
  ({ firstName, lastName, email, notifyByEmail, reaction }) => {
    apply(firstName, requiredTextMinLength);
    apply(lastName, requiredTextMinLength);
    // ... other validators
  }
);
```

### Reading Errors

In this example a custom coponent to read error from a form control is created.
As you can see is verbose and it needs to subscribe to value and staus change observables to stay sync with the state

#### Reactive Forms

```typescript
export class OldFormError {
  private destroyRef = inject(DestroyRef);
  fieldControl = input.required<FormControl<string | number>>();

  protected errorLabels = signal<string[]>([]);

  constructor() {
    effect(() => {
      const control = this.fieldControl();
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.updateErrors(control));
      this.updateErrors(control);
    });
  }

  private updateErrors(control: FormControl<string | number>) {
    if (control.status !== 'INVALID') {
      this.errorLabels.set([]);
      return;
    }
    const errors = control.errors;
    this.errorLabels.set(
      Object.keys(errors || {}).map((key) => {
        if (key === 'required') return 'This field is required';
        if (key === 'email') return 'Enter a valid email';
        if (key === 'minlength') return `Minimum length is ${errors[key].requiredLength}`;
        return `Invalid ${key}`;
      })
    );
  }
}
```

#### Signal Forms

Much more concise, since the field is a signal that updates automatically:

```typescript
@Component({
  selector: 'app-form-error',
  imports: [FormErrorTemplate],
  template: ` <app-form-error-template [errorLabels]="errorLabels()" /> `,
})
export class FormError {
  fieldControl = input<FieldState<string, string | number>>();

  protected errorLabels = computed<string[]>(() => {
    const signalControl = this.fieldControl();
    if (!!signalControl && signalControl.errors().length) {
      return signalControl.errors().map(({ message }) => message || 'Unknown Error');
    }
    return [];
  });
}
```

### Cross-Field Validations

#### Reactive Forms

With reactive forms, inter-field dependencies require complex logic based on subscriptions:

```typescript
constructor() {
  this.signupForm.controls.notifyByEmail.valueChanges
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((v) => {
      const email = this.signupForm.controls.email;
      if (v) {
        email.setValidators(Validators.required);
      } else {
        email.removeValidators(Validators.required);
      }
      email.updateValueAndValidity();
    });
}
```

#### Signal Forms

The same logic becomes declarative and intuitive:

```typescript
protected readonly signupForm = form(
  this.user,
  ({ firstName, lastName, email, notifyByEmail, reaction }) => {
    required(email, {
      message: 'Field required',
      when: ({ valueOf }) => valueOf(notifyByEmail),
    });
    disabled(reaction, ({ valueOf }) => valueOf(firstName) === 'pippo');
  }
);
```

---

## 🎛️ Custom Form Controls

### Reactive Forms (ControlValueAccessor)

Implementing a custom control required the `ControlValueAccessor` interface with multiple overrides:

```typescript
export class OldReactionPicker implements ControlValueAccessor, OnInit {
  @Input({ required: true }) formControlName!: string;
  private onChange: OnChangeCb = () => {};
  private onTouched: () => void = () => {};

  registerOnChange(onChange: OnChangeCb): void {
    this.onChange = onChange;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  writeValue(newVal: string): void {
    this.value.set(newVal);
  }

  readonly value = model<string | null>(null);
  readonly disabled = signal(false);
  readonly required = signal(false);
}
```

### Signal Forms (FormValueControl)

The `FormValueControl` interface requires only the `value` property, with optional properties like `disabled` and `required`:

```typescript
export class ReactionPicker implements FormValueControl<string | null> {
  readonly value = model<string | null>(null);
  readonly disabled = input(false);
  readonly required = input(false);
}
```

---

## 🎨 New UI Library – Angular Aria

A library that, when integrated with Angular Material and CDK, allows you to create fully accessible interfaces according to WAI-ARIA standards.

### Available Components

| **Input & Selection** |  |
|---|---|
| **Autocomplete** | Text input with filtered suggestions |
| **Listbox** | Single/multi-select option lists with keyboard navigation |
| **Select** | Single-select dropdown with keyboard navigation |
| **Multiselect** | Multi-select dropdown with compact display |
| **Combobox** | Primitive directive that coordinates input with popup |

| **Navigation** |  |
|---|---|
| **Menu** | Dropdown menu with nested submenus and shortcuts |
| **Menubar** | Horizontal navigation bar for persistent application menus |
| **Toolbar** | Grouped controls with logical keyboard navigation |

| **Content Organization** |  |
|---|---|
| **Accordion** | Collapsible content panels |
| **Tabs** | Tab interfaces with automatic or manual activation modes |
| **Tree** | Hierarchical lists with expand/collapse |
| **Grid** | 2D data display with cell-by-cell navigation |

See the example in the `app.component` using tabs.

---

## 📦 Typed SimpleChanges

The `SimpleChanges` type is now fully typizable, eliminating type safety loss:

```typescript
// debug-info.ts
export class DebugInfo implements OnChanges {
  @Input({ required: true }) value!: User | null;
  @Input({ required: true }) valid!: boolean;

  ngOnChanges(changes: SimpleChanges<{ value: User; valid: boolean }>): void {
    if (changes.valid && changes.value) {
      console.log('both changed');
    } else if (changes.valid && !changes.value) {
      console.log('only valid');
    } else if (changes.value && !changes.valid) {
      console.log('only value');
    }
  }
}
```

---

## 🚀 Enhanced HttpResponse and HttpErrorResponse

The `HttpResponse` and `HttpErrorResponse` classes expose the new `responseType` property, which represents the underlying Fetch API response type.

Possible values: `'basic'`, `'cors'`, `'opaque'`, `'opaqueRedirect'`

```typescript
// data.service.ts
return this._httpClient
  .put<User>('https://dummyjson.com/users/2', value, { observe: 'response' })
  .pipe(
    map((response) => {
      console.log('Response type:', response.responseType);

      if (response.responseType === 'opaque') {
        console.warn('⚠️ CORS issue detected – response is opaque.');
      }
      if (response.responseType === 'cors') {
        console.warn('⚠️ CORS issue detected');
      }

      return response.body;
    })
  );
```

This property is useful for diagnosing CORS issues and better understanding network behavior.
