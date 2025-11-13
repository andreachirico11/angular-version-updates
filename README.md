# Angular 8

## 🚀 Dynamic Route Imports (Lazy Loading)

### What Changed
From version 8, Angular has modified the syntax for lazy loading modules in routes.

**Previous syntax (deprecated):**
```typescript
{
  path: 'admin',
  loadChildren: './admin/admin.module#AdminModule'
}
```

**New syntax (Angular 8+):**
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

### Benefits
- **Greater flexibility**: the callback allows importing not only modules, but also standalone components
- **Type safety**: import errors detectable at compile time
- **Compatibility with modern standards**: uses JavaScript dynamic imports (ES2020)

### Demo in the Application
In the example app, by pressing the "Old" and "New" buttons, you can verify from the Developer Tools (Network tab) that both syntaxes load modules lazily with the same result.

---

## 🎯 Static Query Resolution (@ViewChild / @ContentChild)

### New Property: `static`
Angular 8 introduces the `static` property for `@ViewChild` and `@ContentChild` queries, which controls **when** the query is resolved.

### Syntax
```typescript
@ViewChild('myElement', { static: true }) myElement: ElementRef;  // Resolves before ngOnInit
@ViewChild('myElement', { static: false }) myElement: ElementRef; // Resolves in ngAfterViewInit
```

### When to Use `static: true`
- When the element is **always present** in the template (not inside `*ngIf` or `*ngFor`)
- When you need to access the element **inside `ngOnInit`**

### When to Use `static: false` (default)
- When the element might **not be present** initially
- When accessing the element happens in `ngAfterViewInit` or later
- **Default behavior and recommended best practice**

### Demo in the Application
Opening the console on page refresh, you can observe two components using different queries:
- **With `static: true`**: the component is already available in `ngOnInit`
- **With `static: false`**: the component is only available in `ngAfterViewInit`

---

## ⚡ Ivy Renderer & AOT Compilation

### Ivy: The New Rendering Engine
Angular 8 introduces **Ivy** as the next-generation rendering engine (opt-in in v8, default from v9).

### AOT vs JIT Compilation

| **AOT (Ahead-of-Time)** | **JIT (Just-in-Time)** |
|-------------------------|------------------------|
| ✅ Compilation **before** download | Compilation **in the browser** |
| ✅ Smaller bundles | Larger bundles |
| ✅ Better performance | Slower load times |
| ✅ Error detection at build time | Errors detected at runtime |
| 🎯 **Default in production** | Used in development mode |

### Ivy Benefits
- **Bundle size reduced** by up to 40%
- **Faster compilation**
- **Better tree-shaking**
- **Simplified debugging**
- **Backward compatibility** guaranteed

