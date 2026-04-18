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
* [Svelte Component Docs](/docs/svelte-component) – Lightweight and reactive

---

## FAQ

**Can I use the JS Plugin inside a React/Vue app?**  
Yes, but it is not recommended. You would need to manually handle `useEffect` or `onMounted` hooks to prevent memory leaks and ensure the plugin re-initialises correctly when the component updates. Our native components do this for you out of the box.

**Do the components include all the plugin features?**  
Yes. All [initialisation options](/docs/options) and [methods](/docs/methods) are available through the component props and refs.

**Which version is the most "up to date"?**  
All versions are maintained simultaneously. When the core JavaScript logic is updated, those changes are immediately available to the React, Vue, Angular, and Svelte components.