## 2026-07-12 - Added character count and alert role to inquiry form
**Learning:** Text areas with character limits can be frustrating if users aren't aware of the limit until they hit it. By pairing a live character count (`aria-live="polite"`) with `aria-describedby` on the input, we provide visual and auditory feedback contextually. Additionally, error messages for form submissions require `role="alert"` for screen readers to announce them when they conditionally render.
**Action:** When adding `maxLength` to text inputs, also introduce a visual character count element linked to the input via `aria-describedby`. Ensure dynamic error messages use `role="alert"`.

## 2023-09-13 - Focus Management on Custom Input Wrappers
**Learning:** When stripping default focus outlines from inner native form controls (like `<select>` or `<input>`) inside custom styled wrapper elements, keyboard users lose visual focus indication. Using `:focus-visible` on the wrapper won't trigger when the inner element receives focus.
**Action:** Pair `outline: none` on the inner control with `:focus-within` on the parent wrapper element to restore accessible keyboard focus indication.
