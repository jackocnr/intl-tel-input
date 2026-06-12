import type { InputHTMLAttributes } from "vue";

// Defined in a standalone file (rather than inline in IntlTelInput.vue) so the
// generated IntlTelInput.vue.d.ts references an *exported* Props type instead of
// a private one. Without this, consumers who wrap the component and emit their own
// declarations hit TS4082 ("Default export ... is using private name 'Props'").
export interface Props {
  usePreciseValidation?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  inputProps?: InputHTMLAttributes;
  initialValue?: string | null;
  modelValue?: string | null;
}
