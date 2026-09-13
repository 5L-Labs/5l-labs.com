## 2025-07-05 - DoS vulnerability due to lack of input length limit
**Vulnerability:** User inputs (name, email, phone, message) in `src/pages/inquiry.js` lack explicitly defined maximum lengths, which might lead to excessive memory consumption on the client or DoS on external integrations (like Formspree or Email clients) if abused with extremely large inputs.
**Learning:** It's important to set a reasonable `maxLength` on user-facing inputs to protect against client-side and upstream service degradation.
**Prevention:** Always define `maxLength` on `<input>` and `<textarea>` fields in React forms as a basic defense-in-depth practice.
## 2024-05-24 - Enforcing Stream Limits on API Clients
**Vulnerability:** The `get_embedding` API client loaded the entire response into memory via `response.json()` without size limits, making it susceptible to DoS via memory exhaustion if the remote API returned an oversized payload.
**Learning:** Even trusted or internal API endpoints should be treated defensively. The same protections (stream=True, context managers, byte limits) applied to untrusted web scraping must be applied to API clients.
**Prevention:** Always use `stream=True` and wrap `requests` calls in context managers (`with requests.get(...) as response:`). Enforce explicit size limits before calling `.json()` or `.content`.
## 2025-07-06 - Missing noopener on external link
**Vulnerability:** A standard HTML `<a>` tag with `target="_blank"` in `src/components/OpenEmbeddingsConceptDemo/index.js` only used `rel="noreferrer"` but omitted `noopener`. This might allow the opened page to gain access to the original page's `window` object via `window.opener` in older browsers, leading to reverse tabnabbing.
**Learning:** Even if modern browsers implicitly set `noopener` for `target="_blank"`, strict security policies and linters often require it to be explicitly declared to prevent reverse tabnabbing on older browsers or non-standard environments.
**Prevention:** Always explicitly include `rel="noopener noreferrer"` on standard HTML `<a>` tags when using `target="_blank"`.
