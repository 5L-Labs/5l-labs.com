## 2025-07-05 - DoS vulnerability due to lack of input length limit
**Vulnerability:** User inputs (name, email, phone, message) in `src/pages/inquiry.js` lack explicitly defined maximum lengths, which might lead to excessive memory consumption on the client or DoS on external integrations (like Formspree or Email clients) if abused with extremely large inputs.
**Learning:** It's important to set a reasonable `maxLength` on user-facing inputs to protect against client-side and upstream service degradation.
**Prevention:** Always define `maxLength` on `<input>` and `<textarea>` fields in React forms as a basic defense-in-depth practice.
