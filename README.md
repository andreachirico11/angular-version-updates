# Angular Version 18

## 🔗 Wiz Integration

**Wiz** is an internal Google framework used to create performance-critical applications, such as:
- Google Search
- Google Photos  
- Google Payments
- YouTube

### Key Features

Traffic on these sites is enormous, and many users don't have access to fast internet. Wiz focuses on:

✅ **Optimized performance** with relatively low interactivity  
✅ **SSR (Server-Side Rendering)** as fundamental - all components are rendered with an optimized streaming solution  
✅ **Intelligent lazy loading** - JavaScript required for page interaction is only loaded when the component is visible to the user

---

## 🎯 Signals API

### input() Signal

Optimized version of `@Input()` that transforms inputs into signals.

#### Syntax

```typescript
@Component({...})
export class MyComponent {
  // Default: undefined
  optionalInput = input<number>();

  // Default: 5
  optionalInputWithDefaultValue = input<number>(5);

  // Parent MUST pass a value
  requiredInput = input.required<number>();

  // ⚠️ ERROR - setting a default value for required input is not allowed
  // requiredInputWithDefaultValue = input.required<number>(5);  
}
```

#### Features

- ✨ Same syntax as signals during usage
- 🔒 **Readonly** - not modifiable like classic signals
- 🔄 Compatible with `computed()`, `effect()`, etc.
- 📝 See example in `item.component.ts`

#### Benefits

This new approach reduces the use of `ngOnChanges`.

**Example**: `oldCounter` vs `newCounter` in `header.component`

In the **parent** component nothing changes, but in the **child** component using `input()` you can treat the input as a signal, enabling the use of `effect()`:

```typescript
newCounter = input("", {
  transform: (val: number) => "New Counter: " + val
});
```

The optional second argument allows you to **transform** the input value (similar to a setter).

---

### model() Signal

It's a superstructure of `input()` with the same syntax.

#### When to Use It

Ideal for signals that need to support:
- ✅ **Two-way binding**
- ✅ **Output emission**

#### Example

See `list-header.component.ts`:

```typescript
customDescription = model<string>("");
```

The component **automatically** generates an event that takes the model name + `"Change"`.

**Benefits**: Avoids the use of explicit `EventEmitter`.

---

### Signal Queries

The new functions transform classic queries into signals:

- `viewChild()`
- `viewChildren()`
- `contentChild()`
- `contentChildren()`

#### Features

✨ Always readable, even in `ngOnInit()`  
📝 See example in `list.component.ts`

```typescript
listItems = viewChildren(ListItemComponent);
```

---

### output()

**Type-safe** version of `@Output()`.

> ⚠️ **Important**: It's not a signal, but a way to standardize syntax.

#### RxJS Integration

RxJS has created two utilities:
- `outputFromObservable()` - transforms an Observable into an output
- `outputToObservable()` - transforms an output into an Observable

#### Examples

See `list.component.ts` and `list-header.component.ts`:

```typescript
// Simple output
addClick = output<void>();

// Output from Observable
private deleteAll$ = new Subject<void>();
deleteAll = outputFromObservable(this.deleteAll$);
```

---

## 🆕 Other New Features

### ng-content Fallback

Now `<ng-content>` can contain **default content** used only when content projection is missing.

#### Example

See `list.component.html`:

```html
<div class="placeholder">
  <ng-content>
    ⏳ Loading...
  </ng-content>
</div>
```

If the parent doesn't project content, "⏳ Loading..." is displayed.

---

### New Reactive Forms Events

Angular has introduced new events for Reactive Forms:

| Event | Description |
|-------|-------------|
| `PristineChangeEvent` | When the pristine status changes (initial state) |
| `TouchedChangeEvent` | When the input is "touched" |

These events allow more granular control over form state.
