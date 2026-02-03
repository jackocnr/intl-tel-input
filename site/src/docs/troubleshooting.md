# Troubleshooting

## Full-width input

If you want your input to be full-width, you need to set the container to be the same, i.e.

```css
.iti { width: 100%; }
```

## dropdownContainer: dropdown not closing on scroll

If you have a scrolling container other than `window` which is causing problems by not closing the dropdown on scroll, simply listen for the scroll event on that element, and trigger a scroll event on `window`, which in turn will close the dropdown, e.g.

```js
scrollingElement.addEventListener("scroll", () => {
  const e = document.createEvent('Event');
  e.initEvent("scroll", true, true);
  window.dispatchEvent(e);
});
```

## Input margin

For the sake of alignment, the default CSS forces the input's vertical margin to `0px`. If you want a vertical margin, you should add it to the container (with class `iti`).

## Displaying error messages

If your error handling code inserts an error message before the `<input>`, it will break the layout. Instead, you must insert it before the container (with class `iti`).

## Dropdown position

The dropdown should automatically appear above/below the input depending on the available space. For this to work properly, you must only initialise the plugin after the `<input>` has been added to the DOM.

## Placeholders

To get the automatic country-specific placeholder numbers, simply omit the placeholder attribute on the `<input>`, or set `autoPlaceholder` to `"aggressive"` to override any existing placeholder. Note: this requires the utils script to be loaded.

## Bootstrap input groups

A couple of CSS fixes are required to get the plugin to play nice with Bootstrap [input groups](https://getbootstrap.com/docs/3.3/components/#input-groups). You can see a Codepen [here](https://codepen.io/jackocnr/pen/EyPXed).  
_Note: there is currently [a bug](https://bugs.webkit.org/show_bug.cgi?id=141822) in Mobile Safari which causes a crash when you click the dropdown arrow (a CSS triangle) inside an input group. The simplest workaround is to remove the CSS triangle with this line:_

```css
.iti__arrow { border: none; }
```
