## 2025-02-21 - Content-Type Validation in Fetchers
**Vulnerability:** Python `requests` (and similar libraries) will happily stream any content type, allowing attackers to force a crawler to download and process unexpected binary files or large data streams.
**Learning:** Scripts that fetch content (like for embeddings or metadata) often check size limits but neglect `Content-Type`. This can waste resources or trigger errors in parsers.
**Prevention:** Always validate `Content-Type` headers against a strict allowlist (e.g., `text/html`, `application/xml`) *before* iterating over the response content.

## 2025-02-21 - Connection Leak DoS in requests.get with stream=True
**Vulnerability:** When using `requests.get(..., stream=True)`, if the response is not fully consumed and `.close()` is not manually called on all early return paths (like redirect checks or content-type validations), the underlying connection remains open. Over many requests, this leads to connection pool exhaustion and a Denial of Service (DoS).
**Learning:** Manual resource management (`response.close()`) in python is error-prone, especially when multiple early exit conditions exist in the code.
**Prevention:** Always wrap `requests.get` (or equivalent network calls) in a `with` statement (context manager) to guarantee the connection is closed when the block exits, regardless of how it exits.
