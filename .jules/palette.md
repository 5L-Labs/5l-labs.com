## 2026-07-12 - Added character count and alert role to inquiry form
**Learning:** Text areas with character limits can be frustrating if users aren't aware of the limit until they hit it. By pairing a live character count (`aria-live="polite"`) with `aria-describedby` on the input, we provide visual and auditory feedback contextually. Additionally, error messages for form submissions require `role="alert"` for screen readers to announce them when they conditionally render.
**Action:** When adding `maxLength` to text inputs, also introduce a visual character count element linked to the input via `aria-describedby`. Ensure dynamic error messages use `role="alert"`.

## 2026-07-28 - Restored focus outlines on OpenEmbeddings concept demo
**Learning:** Hidden outlines via `outline: none;` severely affect screen readers and keyboard users as they navigate options in native dropdowns (`<select>`) or custom ARIA widgets. Adding `:focus-visible` states explicitly is a necessity. Using `:focus-within` on custom parent wrappers is the easiest way to give visual focus back to internally hidden native inputs/select elements.
**Action:** When building or modifying custom interactive UI elements, explicitly implement `aria-label` and `aria-pressed` (if stateful). Restore missing keyboard focus indicators using `:focus-visible` or `:focus-within` in the CSS.
