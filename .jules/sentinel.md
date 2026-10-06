## 2025-07-05 - DoS vulnerability due to lack of input length limit
**Vulnerability:** User inputs (name, email, phone, message) in `src/pages/inquiry.js` lack explicitly defined maximum lengths, which might lead to excessive memory consumption on the client or DoS on external integrations (like Formspree or Email clients) if abused with extremely large inputs.
**Learning:** It's important to set a reasonable `maxLength` on user-facing inputs to protect against client-side and upstream service degradation.
**Prevention:** Always define `maxLength` on `<input>` and `<textarea>` fields in React forms as a basic defense-in-depth practice.
## 2024-05-24 - Enforcing Stream Limits on API Clients
**Vulnerability:** The `get_embedding` API client loaded the entire response into memory via `response.json()` without size limits, making it susceptible to DoS via memory exhaustion if the remote API returned an oversized payload.
**Learning:** Even trusted or internal API endpoints should be treated defensively. The same protections (stream=True, context managers, byte limits) applied to untrusted web scraping must be applied to API clients.
**Prevention:** Always use `stream=True` and wrap `requests` calls in context managers (`with requests.get(...) as response:`). Enforce explicit size limits before calling `.json()` or `.content`.

## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.
