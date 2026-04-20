# Choosing your integration

`intl-tel-input` is available in two primary flavours: a standalone **JavaScript plugin** and a set of native **framework components**. While both offer the same core features (country-picker, formatting and validation), the best choice depends on your project’s architecture.

## 1. JavaScript plugin
The original version of `intl-tel-input`. Use this if you are not using a modern frontend framework, or if you prefer to manage the DOM manually. It is lightweight, has zero dependencies, and works in any environment.

[Getting Started with the JS Plugin](/docs/getting-started)

## 2. Framework components
We provide native wrappers for the four most popular frontend frameworks. These components handle the lifecycle of the plugin for you (initialisation and cleanup) and allow you to sync the input value directly with your app’s state.

* [React component docs](/docs/react-component) – For React 16.8+ (Hooks-based)
* [Vue component docs](/docs/vue-component) – Supports Vue 3
* [Angular component docs](/docs/angular-component) – For modern Angular versions
* [Svelte component docs](/docs/svelte-component) – Lightweight and reactive

---

## FAQ

**Can I use the JS Plugin inside a React/Vue/Angular/Svelte app?**  
Technically yes — but our native framework components are the recommended path, and do the heavy lifting for you so you can drop a phone input into your app in just a few lines of code:

* **Lifecycle handled** — initialisation on mount and `destroy()` on unmount, so you don't leak instances or listeners.
* **Two-way value binding** — pass the number in as a prop and it stays in sync with your app's state, with internal guards to avoid cursor jumps while typing.
* **Reactive `disabled` and `readonly`** — toggle them like any other prop and the component calls the right plugin methods for you.
* **Typed change callbacks** — `changeNumber`, `changeCountry`, `changeValidity`, and `changeErrorCode` exposed as idiomatic, fully-typed handlers for each framework.
* **Utils-aware internals** — the component awaits `iti.promise` before seeding or updating its own state, so initial values and prop-driven updates work even when utils are loaded asynchronously.
* **Escape hatch** — grab the underlying `Iti` instance via a ref for anything the component doesn't expose directly.

Pick your framework in the list above to get started.

**Do the components include all the plugin features?**  
Yes. All [initialisation options](/docs/options) and [methods](/docs/methods) are available through the component props and refs.

**Which version is the most "up to date"?**  
All versions are maintained simultaneously. When the core JavaScript logic is updated, those changes are immediately available to the React, Vue, Angular, and Svelte components.