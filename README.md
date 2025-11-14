# Angular 15 

## 🚀 Standalone Components (Components as Modules)

### Stable Release
Standalone components, introduced as a developer preview in Angular 14, are now **stable and production-ready** in Angular 15.

### Key Concepts

#### 1. Every Component Can Be a Module
Components no longer need to be declared in NgModules. They can work independently with their own imports:

```typescript
@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule, SharedModule, ThirdComponent],
  template: `<h1>Standalone Component</h1>`
})
export class FirstStandaloneComponent { }
```

#### 2. Lazy Loading Components Directly
You can now lazy load individual components without wrapping them in modules.

#### 3. Bootstrap with Any Component
Any standalone component can bootstrap the application (see `main.ts`).

### Route Configuration Examples

The example in `app.route.ts` demonstrates all routing approaches:

```typescript
const routes: Routes = [
  {
    path: '',
    title: 'HOME',
    component: FirstStandaloneComponent // Direct component
  },
  {
    path: 'classic',
    // Old lazy-loaded modules are still supported
    loadChildren: () =>
      import('./classic-compo/classic-module.module').then(
        ({ClassicModuleModule}) => ClassicModuleModule
      ),
  },
  {
    path: 'second',
    title: 'Second',
    // Lazy load component as a module
    loadComponent: () =>
      import('./second-standalone/second-standalone.component').then(
        ({SecondStandaloneComponent}) => SecondStandaloneComponent
      ),
  }
];
```

### Backward Compatibility
**Classic NgModules are still fully supported**, allowing gradual migration. You can mix standalone components and traditional modules in the same application.

### Dependency Injection Example

**FirstStandaloneComponent** demonstrates service injection:

**Key points:**
- Imports `SharedModule` which provides `TestService`
- Service injection works exactly like with NgModules
- Also imports a component from that module for use in the template

### Component Composition Example

**SecondStandaloneComponent** demonstrates importing other standalone components:


This shows that standalone components **work exactly like modules** - they can import and use other components.

### Module Caching with Lazy Loading

When using lazy loading with `loadComponent`, Angular automatically caches already downloaded modules:

```typescript
// First navigation downloads the component
// Subsequent navigations reuse the cached version
loadComponent: () => import('./my-component').then(m => m.MyComponent)
```

### Bootstrapping Application

**main.ts** demonstrates bootstrapping with standalone components:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Add other providers
  ]
});
```

### Benefits
- **Simpler architecture**: no need for NgModules
- **Better tree-shaking**: only used code is included
- **Easier lazy loading**: load components directly
- **Reduced boilerplate**: less configuration needed
- **Faster learning curve**: more intuitive for beginners
- **Gradual migration**: mix with existing NgModules

---

## 🎨 Directive Composition API

### Standalone Directives
Like components, **directives can now be standalone** and don't require NgModule declarations.

### Host Directives
The new **`hostDirectives`** property allows applying directives directly to a component's host element without adding them in the HTML template.

### Basic Example

**Traditional approach:**
```html
<!-- Must add directive in every template -->
<div appColor [color]="'red'" appTooltip [text]="'Hello'">Content</div>
```

**Angular 15 approach:**
```typescript
@Component({
  selector: 'app-third',
  standalone: true,
  hostDirectives: [ColorDirective, TooltipDirective], // Applied automatically!
  template: `<div>Content</div>` // No directives needed in HTML
})
export class ThirdStandaloneComponent { }
```

### Binding Inputs and Outputs

From the example in `third-standalone.component.ts`:

```typescript
  hostDirectives: [{directive: ColorDirective, inputs: ['color']}]
```

Now you can bind to the component directly:

```html
<app-third-standalone color="red"></app-third-standalone>
```

### Benefits
- **Reusability**: apply common behaviors without repetition
- **Cleaner templates**: no need to add directives in HTML
- **Composition over inheritance**: compose behaviors from multiple directives
- **Encapsulation**: directive logic is hidden from consumers
- **Input/output forwarding**: seamless binding through component API



---

## 🖼️ NgOptimizedImage Directive

### Intelligent Image Loading
Angular 15 introduces **NgOptimizedImage**, a directive that optimizes image loading with automatic lazy loading, prioritization, and caching.

### Demo: Old vs New Carousel

The example includes two carousel components comparing traditional and optimized approaches:

**Dataset:** 
- 4 unique images repeated 100 times = 400 total images
- Only the first image is visible initially
- Other images are hidden off-screen

### Old Carousel Behavior

**Problem: Loads all images immediately**


**Result:**
- ❌ 400 HTTP requests on page load (in this case only 4 because browser recognize the image repetition)
- ❌ Slow initial page load
- ❌ Wasted bandwidth for hidden images
- ❌ Poor performance on mobile

### New Carousel with NgOptimizedImage

**Solution: Lazy load images as they enter viewport**



**Result:**
- ✅ Only a limited number of HTTP request initially
- ✅ Images load as user scrolls (viewport detection)
- ✅ Fast initial page load
- ✅ Bandwidth saved for off-screen images

### Key Features

#### 1. Priority Attribute
```typescript
// Load immediately (above-the-fold images)
<img ngSrc="hero.jpg" priority width="1200" height="600">

// Lazy load (below-the-fold images)
<img ngSrc="product.jpg" width="400" height="300">
```

#### 2. Automatic Lazy Loading
Images without `priority` are automatically lazy-loaded when they enter the viewport.

#### 3. Required Dimensions
```typescript
// Width and height are required for optimal rendering
<img ngSrc="image.jpg" width="800" height="600">
```

#### 4. Responsive Images
```typescript
<img 
  ngSrc="image.jpg" 
  width="800" 
  height="600"
  sizes="(max-width: 768px) 100vw, 50vw">
```

### Benefits
- **Faster page loads**: only load visible images
- **Better Core Web Vitals**: improved LCP, CLS scores
- **Bandwidth savings**: especially important for mobile users
- **Automatic optimization**: no manual lazy loading code needed
- **SEO improvements**: better page performance rankings
