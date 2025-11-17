# Angular Version 17

## 1. New Interactive Documentation

Angular 17 introduces a completely redesigned documentation platform with interactive tutorials at **[angular.dev](https://angular.dev/)**.
The new docs represent a major step forward in making Angular more accessible to developers of all skill levels.

---

## 2. Vite as Default Build Tool

Angular 17 adopts **Vite** as the default development server and build tool, replacing Webpack for new projects.

### Benefits
- **⚡ Faster startup times**: near-instantaneous dev server startup
- **🔥 Lightning-fast HMR**: hot module replacement updates in milliseconds
- **📦 Optimized builds**: improved production bundle sizes
- **🛠️ Better DX**: simpler configuration and faster feedback loops

This change significantly improves the developer experience, especially for large applications.

---

## 3. Built-in Control Flow and Loops

Angular 17 introduces a new, native syntax for control flow that's **much faster and more intuitive** than the traditional structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`).

### New Syntax

#### Conditional Rendering
```typescript
@if (user.isLoggedIn) {
  <dashboard-component />
} @else if (user.isGuest) {
  <guest-view />
} @else {
  <login-form />
}
```

#### Loops
```typescript
@for (item of items; track item.id) {
  <item-card [data]="item" />
} @empty {
  <p>No items found</p>
}
```

#### Switch Statements
```typescript
@switch (userRole) {
  @case ('admin') {
    <admin-panel />
  }
  @case ('user') {
    <user-dashboard />
  }
  @default {
    <guest-view />
  }
}
```

### Advantages
- **Better performance**: optimized rendering and change detection
- **More readable**: cleaner, more intuitive syntax
- **Type safety**: improved TypeScript integration
- **Less boilerplate**: no need to import CommonModule directives

---

## 4. Deferrable Views (Lazy Loading on Steroids)

The `@defer` block is an intelligent feature that allows **lazy loading of components and templates** based on configurable triggers.

### Basic Syntax

```typescript
@defer (on viewport) {
  <heavy-component />
} @placeholder {
  <p>Loading...</p>
} @loading (minimum 2s) {
  <spinner />
} @error {
  <p>Failed to load component</p>
}
```

### Trigger Options

- **`on idle`**: loads when the browser is idle
- **`on viewport`**: loads when the element enters the viewport
- **`on interaction`**: loads on user interaction (click, focus)
- **`on hover`**: loads when user hovers over the placeholder
- **`on immediate`**: loads immediately (default)
- **`on timer(Xms)`**: loads after a specified delay
- **`when condition`**: loads when a boolean expression is true

### Example (from father.component.html)

```typescript
<p>father works!</p>

@defer (on viewport) {
<child />
} @placeholder {
<p>
  Loading child component
</p>
}

```

### How It Works

When using `on viewport`, the component code is **only downloaded when it becomes visible** on the page. This dramatically improves:
- **Initial page load time**
- **Bundle size** (code splitting)
- **Performance on slow connections** (test with Chrome DevTools: slow 3G)

### Testing
To see the impact, test your application with Chrome DevTools Network throttling set to "Slow 3G". You'll notice deferred components load only when needed.

---

## 5. Hybrid Rendering (SSR + SSG)

Angular 17 projects can be **automatically generated with server-side rendering (SSR)** enabled, providing faster initial page loads and better SEO.

### Rendering Strategies

Angular 17 supports multiple rendering strategies:

- **Client-Side Rendering (CSR)**: traditional SPA behavior
- **Server-Side Rendering (SSR)**: pre-renders pages on the server
- **Static Site Generation (SSG)**: pre-renders pages at build time
- **Hybrid**: combines SSR and CSR for optimal performance

### Benefits

- **⚡ Faster initial load**: users see content immediately
- **🔍 Better SEO**: search engines can crawl pre-rendered content
- **📱 Improved mobile experience**: less JavaScript processing on the client
- **🎯 Core Web Vitals**: improved performance metrics (LCP, FID, CLS)

### Setup

New projects can be created with SSR enabled:

```bash
ng new my-app --ssr
```

Existing projects can add SSR:

```bash
ng add @angular/ssr
```

