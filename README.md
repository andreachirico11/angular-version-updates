# Angular 12 

## ⚡ Ivy Everywhere

### The Complete Transition
Angular 12 marks the **complete removal of View Engine**. Ivy is now the only rendering engine available, and all legacy View Engine code has been eliminated from the framework.

### From View Engine to Ivy

| **View Engine (Legacy)** | **Ivy (Angular 12+)** |
|--------------------------|----------------------|
| Larger bundle sizes | Up to 40% smaller bundles |
| Slower compilation | Significantly faster builds |
| Complex debugging | Cleaner stack traces |
| Global compilation | Locality-based compilation |
| Limited tree-shaking | Advanced tree-shaking |

### What This Means
- **No fallback option**: `enableIvy: false` is no longer available
- **Cleaner codebase**: framework is simpler and more maintainable
- **Better performance**: all apps benefit from Ivy optimizations
- **Future-ready**: foundation for upcoming Angular features

### Learn More
Check out this [detailed article](https://browserperson.medium.com/from-view-engine-to-ivy-rendering-in-angular-a81d9eb8199b) about the transition from View Engine to Ivy rendering in Angular.

---

## 🎯 Nullish Coalescing in HTML Templates

### New Operator: `??`
Angular 12 introduces support for the **nullish coalescing operator** (`??`) directly in templates, providing more precise control over default values.

### Syntax
```html
{{ value ?? 'default' }}
```

### Nullish Coalescing vs. OR Operator

**Traditional OR operator (`||`):**
```html
{{ name || 'Guest' }}
<!-- Returns 'Guest' for: null, undefined, '', 0, false -->
```

**Nullish coalescing (`??`):**
```html
{{ name ?? 'Guest' }}
<!-- Returns 'Guest' ONLY for: null, undefined -->
```

### Truthy/Falsy Cheatsheet
The example `app.component.html` contains a complete cheatsheet of all truthy/falsy transformations:

### When to Use `??`
- When `0`, `false`, or `''` are valid values
- When you only want to handle `null` and `undefined`
- For more precise default value logic

---

## 🔒 Strict Type Checking (tsconfig)

### Stricter TypeScript Configuration
Angular 12 encourages (and new projects default to) **strict mode** in TypeScript configuration, requiring explicit initialization of class properties.

### The Change
**Previous behavior (loose mode):**
```typescript
export class AppComponent {
  possiblyNull: string; // No error, implicitly undefined
}
```

**Angular 12 strict mode:**
```typescript
export class AppComponent {
  possiblyNull: string; // ❌ Error: Property has no initializer
}
```

### Solutions

**1. Initialize the property:**
```typescript
possiblyNull: string = '';
```

**2. Mark as optional:**
```typescript
possiblyNull?: string;
```

**3. Use union with undefined:**
```typescript
possiblyNull: string | undefined;
```

**4. Use definite assignment assertion (!):**
```typescript
possiblyNull!: string;
// Tells TypeScript: "Trust me, this will be assigned"
```

### Demo in the Application
The `possiblyNull` property in AppComponent demonstrates this behavior. Try removing the initialization or the `!` operator to see the TypeScript error.

### Benefits of Strict Mode
- **Catch errors early**: uninitialized properties detected at compile time
- **Better code quality**: forces explicit handling of nullable values
- **Fewer runtime errors**: reduces null/undefined related bugs
- **Improved IDE support**: better autocomplete and type inference

### tsconfig.json Example
```json
{
  "compilerOptions": {
    "strict": true,
    "strictPropertyInitialization": true,
    "strictNullChecks": true
  }
}
```

---

## 🎨 Mix Between Inline Styles and File Styles

### Enhanced Styling Flexibility
Angular 12 improves the ability to **combine inline styles with external style files** for the same component, offering greater flexibility in organizing component styles.

### How It Works
You can now seamlessly use both approaches together:

```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'], // External file
  styles: [`
    .inline-style {
      color: red;
    }
  `] // Inline styles
})
export class ExampleComponent { }
```

### Use Cases
- **Quick prototyping**: add inline styles for testing without creating files
- **Dynamic styles**: generate styles programmatically
- **Component-specific overrides**: inline styles for edge cases
- **Third-party integration**: add inline styles when external files are locked

### Style Precedence
1. Inline styles (highest priority)
2. External styleUrls
3. Global styles (lowest priority)

### Best Practices
- Use **external files** for main component styles (maintainability)
- Use **inline styles** sparingly for small, dynamic, or conditional styles
- Keep styles organized and avoid duplication

