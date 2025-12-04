# Angular 9

## 🔍 Phantom Template Variable Error Detection

### What Changed
Before Angular 9, using an undeclared template variable (one that exists in the template but not in the component class) would not produce any error. Now, the compiler detects and reports these issues.

**Example:**
```typescript
// Component
export class AppComponent {
  // commentingThisCausesError is NOT declared here
}
```

```html
<!-- Template -->
<div>{{ commentingThisCausesError }}</div>
<!-- Angular 9+ will throw a compilation error -->
```

### Benefits
- **Stronger type safety**: catch typos and missing properties at compile time
- **Better IDE support**: improved autocomplete and error detection
- **Fewer runtime errors**: issues caught before the app runs

### Testing the Feature
In the example app, try commenting out the `commentingThisCausesError` property inside the AppComponent. The compiler will now detect and report this as an error, whereas previous versions would have silently allowed it.

---

## ⚡ Ivy Becomes the Default

### The Big Change
Angular 9 makes **Ivy the default rendering engine** for all applications. This was opt-in in Angular 8, but now it's the standard compiler and runtime.

### Why This Matters
- **Smaller bundle sizes**: significant reduction in application size
- **Faster compilation**: both development and production builds are quicker
- **Better debugging**: improved stack traces and component inspection
- **Enhanced template type checking**: stricter checking of templates
- **Improved tree-shaking**: better elimination of unused code

### Key Ivy Improvements
| Feature | Benefit |
|---------|---------|
| **Locality** | Each component compiles independently |
| **Incremental DOM** | More efficient rendering and memory usage |
| **Better AOT** | Faster builds with improved optimization |
| **Enhanced debugging** | More readable compiled code |

### Migration Notes
Most applications will work seamlessly with Ivy. If you're upgrading from Angular 8, the update automatically switches to Ivy unless you explicitly opt out.

---

## 🚫 No More `entryComponents` Required

### What Changed
Prior to Angular 9, dynamically created components had to be explicitly declared in the `entryComponents` array of the module. This is **no longer necessary**.

**Old approach (Angular 8 and earlier):**
```typescript
@NgModule({
  declarations: [AppComponent, ModalComponent],
  entryComponents: [ModalComponent], // Required for dynamic components
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**New approach (Angular 9+):**
```typescript
@NgModule({
  declarations: [AppComponent, ModalComponent],
  // No entryComponents needed!
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### What Are Dynamic Components?
Components that are:
- Created programmatically using `ComponentFactoryResolver`
- Not referenced in any template
- Instantiated at runtime

### Demo in the Application
The example includes a `ModalComponent` that is created dynamically through a factory. In previous Angular versions, it would have been necessary to declare it in `app.module.ts` as an `entryComponent`. With Angular 9, this is handled automatically by Ivy.

**Example of dynamic component creation:**
```typescript
const factory = this.resolver.resolveComponentFactory(ModalComponent);
const componentRef = this.viewContainer.createComponent(factory);
```

### Benefits
- **Less boilerplate**: no need to maintain entryComponents array
- **Cleaner code**: more intuitive module configuration
- **Automatic optimization**: Ivy handles component registration automatically

---