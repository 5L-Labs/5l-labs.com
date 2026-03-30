## 2025-02-21 - Content-Type Validation in Fetchers
**Vulnerability:** Python `requests` (and similar libraries) will happily stream any content type, allowing attackers to force a crawler to download and process unexpected binary files or large data streams.
**Learning:** Scripts that fetch content (like for embeddings or metadata) often check size limits but neglect `Content-Type`. This can waste resources or trigger errors in parsers.
**Prevention:** Always validate `Content-Type` headers against a strict allowlist (e.g., `text/html`, `application/xml`) *before* iterating over the response content.

## 2025-02-21 - Reverse Tabnabbing in Dynamic Links
**Vulnerability:** External links created dynamically without `target="_blank"` and `rel="noopener noreferrer"` can allow the newly opened tab to access the `window.opener` object, leading to potential phishing attacks via reverse tabnabbing. Additionally, omitting `noreferrer` leaks referer information.
**Learning:** React components that conditionally render links as internal or external based on the URL often neglect to conditionally apply the correct `target` and `rel` attributes.
**Prevention:** Always ensure dynamic link components evaluate whether a link is external and explicitly apply `target="_blank"` and `rel="noopener noreferrer"`.
