## 2025-07-05 - DoS vulnerability due to lack of input length limit
**Vulnerability:** User inputs (name, email, phone, message) in `src/pages/inquiry.js` lack explicitly defined maximum lengths, which might lead to excessive memory consumption on the client or DoS on external integrations (like Formspree or Email clients) if abused with extremely large inputs.
**Learning:** It's important to set a reasonable `maxLength` on user-facing inputs to protect against client-side and upstream service degradation.
**Prevention:** Always define `maxLength` on `<input>` and `<textarea>` fields in React forms as a basic defense-in-depth practice.
## 2024-05-24 - [DoS Risk in API Calls]
**Vulnerability:** Unguarded `requests.post` calls for embedding generation could lead to memory exhaustion or connection leaks if the API returns exceptionally large payloads.
**Learning:** Even internal or trusted API calls must be protected against malicious or accidental large responses to prevent DoS.
**Prevention:** Use `stream=True`, enforce a strict byte limit with `iter_content`, and wrap the request in a context manager (`with requests.post(...) as response:`) to ensure sockets are implicitly closed.
