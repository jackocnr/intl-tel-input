import { mergeModels as p, useModel as V, ref as o, onMounted as b, watch as h, onUnmounted as C, withDirectives as M, openBlock as N, createElementBlock as x, vModelText as D } from "vue";
import { i as E } from "./intl-tel-input-CH66uD-z.mjs";
const w = {
  __name: "IntlTelInput",
  props: /* @__PURE__ */ p({
    options: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean
    }
  }, {
    modelValue: {
      type: String,
      default: ""
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ p(["changeNumber", "changeCountry", "changeValidity", "changeErrorCode"], ["update:modelValue"]),
  setup(i, { expose: m, emit: v }) {
    const r = V(i, "modelValue"), l = i, u = v, n = o(), t = o(), s = o(!1), f = () => t.value ? l.options.strictMode ? t.value.isValidNumberPrecise() : t.value.isValidNumber() : null, d = () => {
      let e = f();
      s.value !== e && (s.value = e, u("changeValidity", !!e), u("changeErrorCode", e ? null : t.value.getValidationError()));
    }, c = () => {
      var e;
      u("changeNumber", ((e = t.value) == null ? void 0 : e.getNumber()) ?? ""), d();
    }, y = () => {
      var e;
      u("changeCountry", ((e = t.value) == null ? void 0 : e.getSelectedCountryData().iso2) ?? ""), c(), d();
    };
    return b(() => {
      n.value && (t.value = E(n.value, l.options), l.value && t.value.setNumber(l.value), l.disabled && t.value.setDisabled(l.disabled));
    }), h(
      () => l.disabled,
      (e) => {
        var a;
        return (a = t.value) == null ? void 0 : a.setDisabled(e);
      }
    ), C(() => {
      var e;
      return (e = t.value) == null ? void 0 : e.destroy();
    }), m({ instance: t, input: n }), (e, a) => M((N(), x("input", {
      ref_key: "input",
      ref: n,
      "onUpdate:modelValue": a[0] || (a[0] = (g) => r.value = g),
      type: "tel",
      onCountrychange: y,
      onInput: c
    }, null, 544)), [
      [D, r.value]
    ]);
  }
};
export {
  w as default
};
