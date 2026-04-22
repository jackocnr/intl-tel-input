# Choose your integration

`intl-tel-input` comes in two flavours: a standalone **JavaScript plugin** and a set of native **framework components**. Both offer the same core features — country picker, formatting and validation — so pick the one that matches your stack.

<div class="iti-integration-choice row g-4 my-4">
  <div class="col-md-6">
    <div class="iti-integration-card card h-100">
      <div class="card-body d-flex flex-column">
        <i class="bi bi-filetype-js iti-integration-card__icon" aria-hidden="true"></i>
        <h2 class="h4 mt-3 mb-2">JavaScript plugin</h2>
        <p class="mb-3">If you're <strong>not</strong> using a frontend framework, or prefer to manage the DOM yourself.</p>
        <ul class="mb-4 ps-3">
          <li>Zero dependencies</li>
          <li>Lightweight</li>
          <li>Works anywhere</li>
        </ul>
        <div class="mt-auto">
          <a href="/docs/javascript-plugin" class="btn btn-primary">Get started</a>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-6">
    <div class="iti-integration-card card h-100">
      <div class="card-body d-flex flex-column">
        <i class="bi bi-boxes iti-integration-card__icon" aria-hidden="true"></i>
        <h2 class="h4 mt-3 mb-2">Framework components</h2>
        <p class="mb-3">If you're using React, Vue, Angular, or Svelte — the component handles lifecycle, two-way binding, and change callbacks for you.</p>
        <p class="iti-integration-card__cta mb-2">Pick your framework:</p>
        <div class="d-flex flex-wrap gap-2 mt-auto">
          <a href="/docs/react-component" class="btn btn-primary">React</a>
          <a href="/docs/vue-component" class="btn btn-primary">Vue</a>
          <a href="/docs/angular-component" class="btn btn-primary">Angular</a>
          <a href="/docs/svelte-component" class="btn btn-primary">Svelte</a>
        </div>
      </div>
    </div>
  </div>
</div>

## FAQ

**Can I manually use the JavaScript Plugin inside a React (etc) app myself?**  
Technically yes, but our native framework components are the recommended path - they do the heavy lifting for you so you can drop a phone input into your app in just a few lines of code:

* **Lifecycle handled** — initialisation on mount and `destroy()` on unmount, so you don't leak instances or listeners.
* **Two-way value binding** — pass the number in as a prop and it stays in sync with your app's state, with internal guards to avoid cursor jumps while typing.
* **Typed change callbacks** — `changeNumber`, `changeCountry`, `changeValidity`, and `changeErrorCode` exposed as idiomatic, fully-typed handlers for each framework.
* **Escape hatch** — grab the underlying plugin instance via a ref for anything the component doesn't expose directly.

**Do the components include all the plugin features?**  
Yes — plus more. All [initialisation options](/docs/options) and [methods](/docs/methods) are available through the component props and refs, and on top of that you get the framework-native conveniences like two-way binding and typed callbacks (see above).

**Which version is the most "up to date"?**  
All versions are maintained simultaneously. When the core JavaScript logic is updated, those changes are immediately available to the React, Vue, Angular, and Svelte components.
