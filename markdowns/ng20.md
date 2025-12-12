# 🅰️ Angular Version 20

## 📝 Template Literals

Previously, concatenating strings in Angular templates could be verbose. Now you can use clean, JavaScript-like template literals directly in your component templates.

> > **Note:** Angular template literals don't work with inline HTML written within TypeScript template literals.

**✨ Example** (in `products.html`):

```html
<p class="price-info">
  {{ `The ${productName()} package costs ${price} for ${productType()} tier` }}
</p>
```

### 🏷️ Tagged Template Literals

Tagged template literals are functions applied directly to template literals, providing greater control over interpolations. The first argument is an array containing all string parts, while subsequent arguments are the interpolated variables.

**✨ Example** (in `products.html`):

```html
<p class="offer-banner">
  {{ formatPrice`Upgrade ${productName()} to ${productType()} and save ${discount()}% today!` }}
</p>
```

```typescript
formatPrice(strings: TemplateStringsArray, productName: string, productType: string, discount: number) {
  return `${strings[0]} ${productName}${strings[1]} ${productType}${strings[2]}${discount}${strings[3]}`;
}
```

---

## 🔍 The 'in' Operator

The `in` operator allows you to check whether an object contains a specific property before interpolating its value. This operator is useful for type narrowing or conditionally displaying properties in your components.

**✨ Example** (in `polymorphic-list.html`):

```html
@let isABook = 'isbn' in item && 'pages' in item && 'author' in item;
@if (isABook) {
  <p><strong>Author:</strong> {{ item.author }}</p>
  <p><strong>Pages:</strong> {{ item.pages }}</p>
  <p><strong>ISBN:</strong> {{ item.isbn }}</p>
}
```

---

## 🚫 The 'void' Operator

The `void` operator explicitly ignores the return value of a bound listener, preventing unintentional calls to `event.preventDefault()` if your handler returns `false`.

**✨ Example** (in `mouse-down.ts`):

```typescript
@Directive({
  selector: '[appMouseDown]',
  host: { 
    '(mousedown)': 'handleMousedown($event)', 
    '(mouseup)': 'void handleMouseUp($event)' 
  },
})
```

**🧪 Testing:** When you press on the banner inside the products page, you should see console logs. Events bubble from the banner to the parent element, which also contains the directive. The `mousedown` event doesn't have the `void` operator and is prevented, while `mouseup` is not prevented.

---

## ⏱️ Asynchronous Redirect Function

Angular now supports asynchronous redirect functions. The `redirectTo` property can return a `Promise` or an `Observable` of `string | UrlTree`. This allows you to build redirect logic that waits for data before deciding where to send the user.

**✨ Example** (in `app.route.ts`):

```typescript
{
  path: '**',
  redirectTo: () => {
    const authSrv = inject(AuthService);
    const router = inject(Router);
    return authSrv
      .checkForAuth()
      .pipe(map((isAuth) => router.createUrlTree([isAuth ? 'media' : 'products'])));
  },
}
```

**🧪 Testing:** Enter an incorrect path in the URL and the page will wait 1 second before randomly navigating between the media and products pages.

---

## 🎯 New Features of NgComponentOutlet

`NgComponentOutlet` provides a dynamic way to instantiate and render components within templates. It works like `RouterOutlet` but doesn't require router configuration, making it ideal for scenarios with dynamically loaded components. Although powerful, it previously required extensive manual setup.

### 📋 Examples (in `cards.ts`)

There are three identical card grids demonstrating different approaches:

#### 1️⃣ Static Components (First Grid)
Created without dynamic components.

#### 2️⃣ Old Dynamic Approach (Second Grid - `cards-old-vcr.ts`)
Uses the old mechanism to create cards dynamically:

```typescript
constructor() {
  effect(() => {
    const actualContainers = this.containers();
    actualContainers.forEach((c, index) => {
      c.clear();
      const ref = c.createComponent(CardComponent, {injector: this.fakeCustomInjector});
      ref.setInput('data', { ...this.cardsData[index] });
    });
  });
}
```

#### 3️⃣ New Dynamic Approach (Third Grid)
Uses the current mechanism with minimal TypeScript setup:

**Template:**
```html
<div class="cards-grid">
  @for (card of cardsData; track card.id) {
    <ng-container
      [ngComponentOutlet]="cardCompRef"
      [ngComponentOutletInputs]="getInputs($index)"
      [ngComponentOutletInjector]="fakeCustomInjector"
    />
  }
</div>
```

**TypeScript:**
```typescript
private readonly _injector = inject(Injector);
protected readonly fakeCustomInjector = Injector.create({
  providers: [], // custom providers
  parent: this._injector,
});
protected readonly cardCompRef = CardComponent;

getInputs(index: number) {
  return { data: this.cardsData[index] };
}
```

---

## 🔌 Input, Output Bindings and Directives Support for Dynamically Created Components

New helper functions simplify interaction with dynamically created components.

**Example** (in `app.ts` where the navbar component is created dynamically):

```typescript
container.createComponent(Navbar, {
  bindings: [
    inputBinding('title', this.title),
    // 'title' corresponds to an input signal in the component
    
    outputBinding('navigatePressed', (isNavigatingTo: string) => {
      console.log('is Navigating to: ' + isNavigatingTo);
    }),
    // 'navigatePressed' corresponds to an output signal emitter
    
    twoWayBinding('isLoggedIn', this.isLoggedIn),
    // 'isLoggedIn' corresponds to a model signal
  ],
});
```

### ⚠️ Old Alternative

Previously, as shown in `cards-old-vcr.ts`, you had to use the component instance to bind to its properties:

```typescript
const ref = c.createComponent(CardComponent, { injector: this.fakeCustomInjector });
ref.setInput('data', { ...this.cardsData[index] });
```

This approach only handles inputs. With outputs and other bindings, the code becomes significantly more complex. The new helper functions provide a cleaner, more intuitive API for all binding types.