# Angular Version 19


## 🆕 New Features

### linkedSignal (Experimental)

The new reactive primitive `linkedSignal` is a signal that automatically activates when another source signal is modified. It allows you to read the source signal's value to compute new values, with access to the previous value as well.

**Key Features:**
- Automatic synchronization with the source signal
- Access to previous value for comparisons
- Standard signal methods for manual modifications

**Example - Managing Item Selection:**

```typescript
// list.component.ts
selectedItemIds = linkedSignal<ListItem[], number[]>({
  source: this.items,
  computation: (source, previous) => {
    if (previous?.value) {
      return source.filter(({active}) => active).map(({id}) => id);
    }
    return [];
  },
});
```

Every time the `items` array changes, the `selectedItemIds` array is automatically recalculated.

**Example - Managing Loading State:**

```typescript
// footer.component.ts
loading = linkedSignal<number[], boolean>({
  source: this.selectedItemIds,
  computation: () => {
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
    return true;
  },
});
```

When `selectedItemIds` changes, `loading` is set to `true` and automatically reset to `false` after one second.

---

### resource & rxResource (Experimental)

New APIs created specifically to handle asynchronous operations in a declarative way.

#### resource

API for Promise-based asynchronous operations.

```typescript
// contacts.component.ts
private contactResource = resource({
  request: () => this.filters(), // optional - signal that triggers reload
  loader: async (params) => {
    const response = await fetch(`https://api.mock.com/contacts`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  },
  defaultValue: [],
});
```

**Properties:**
- `request` (optional): signal that triggers resource reloading
- `loader`: callback containing the asynchronous logic
- `defaultValue`: fallback value in case of error

#### rxResource

Version of the resource API integrated with RxJS Observables.

```typescript
// contact-detail.component.ts
private contactDetailResource = rxResource({
  request: this.contactSelectedId,
  defaultValue: null,
  loader: ({ request: contactSelectedId }) => {
    if (!!contactSelectedId) {
      return this.contactService.getContactDetail(contactSelectedId);
    }
    return of(null);
  },
});
```

---

### Equality Function in rxjs-interop

New ability to define custom equality functions for `toSignal()`, allowing more granular control over updates.

```typescript
// table.component
protected vehicles = toSignal(this.tableService.getVehicles(), {
  equal: (oldVs, newVs) => {
    if (!newVs || !oldVs) {
      return false;
    }
    return newVs.every((v) => {
      const oldV = oldVs.find(({ id }) => v.id === id);
      return !!oldV && oldV.plate === v.plate;
    });
  },
});
```

This allows you to avoid unnecessary updates based on custom logic instead of simple reference equality.

---

### afterRenderEffect Function

Unlike `afterRender` which executes after every render, `afterRenderEffect` is specific to the contained signals and only executes when they change.

```typescript
// navbar.component.ts
constructor() {
  afterRenderEffect(() => {
    // Executed only when tracked signals change
    console.log('Signal changed:', this.mySignal());
  });
}
```

---

### Template Variable Syntax: @let

New syntax for defining variables directly in the template, reusable within the same template.

**Features:**
- Read-only variables
- Scope limited to current template and its descendants
- Cannot be reassigned
- Not accessible from parent or sibling components

```typescript
// contact-detail.component.ts
@Component({
  template: `
    @let userName = user().name;
    @let userEmail = user().email;
    
    <div class="user-card">
      <h2>{{ userName }}</h2>
      <p>{{ userEmail }}</p>
    </div>
  `
})
```

---

### routerOutletData Input

New input for `RouterOutlet` that allows passing data to all child components after navigation.

```html
<!-- app.component.html -->
<router-outlet [routerOutletData]="counterData()"/>
```

Child components can access the data through the `ROUTER_OUTLET_DATA` injection token, which returns a signal to react to changes.

```typescript
// table.component.ts
constructor() {
  const outletData = inject(ROUTER_OUTLET_DATA);
  
  effect(() => {
    console.log('Counter value:', outletData().counter);
  });
}
```

---

## 🔧 Configuration Improvements

### New Initializer Helpers

Angular 19 introduces new helper functions that simplify initializer configuration:

- `provideAppInitializer()`
- `provideEnvironmentInitializer()`
- `providePlatformInitializer()`

These functions offer a cleaner and more readable alternative to the traditional `APP_INITIALIZER`, `ENVIRONMENT_INITIALIZER`, and `PLATFORM_INITIALIZER` tokens.

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      console.log('App initialized');
    }),
    provideEnvironmentInitializer(() => {
      console.log('Environment initialized');
    }),
    // ... other providers
  ]
};
```

---

## 📋 Breaking Changes

### Standalone Components by Default

Starting with Angular 19, **all components are standalone by default**. It's no longer necessary to specify `standalone: true` in the component configuration.

```typescript
@Component({
  selector: 'app-example',
  template: `<p>I'm standalone by default!</p>`
})
export class ExampleComponent {}
```

