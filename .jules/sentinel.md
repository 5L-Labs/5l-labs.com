## 2025-02-21 - Content-Type Validation in Fetchers
**Vulnerability:** Python `requests` (and similar libraries) will happily stream any content type, allowing attackers to force a crawler to download and process unexpected binary files or large data streams.
**Learning:** Scripts that fetch content (like for embeddings or metadata) often check size limits but neglect `Content-Type`. This can waste resources or trigger errors in parsers.
**Prevention:** Always validate `Content-Type` headers against a strict allowlist (e.g., `text/html`, `application/xml`) *before* iterating over the response content.

## 2025-02-22 - Connection Leaks in Python Fetchers
**Vulnerability:** Python `requests` when used with `stream=True` requires the connection to be explicitly closed via `response.close()`. If the script exits early (e.g., due to size limits, redirects, invalid Content-Type, or exceptions) before the connection is closed, the underlying TCP connection remains open, leading to resource exhaustion (DoS).
**Learning:** Manual `response.close()` is error-prone. Many early return branches often miss this call.
**Prevention:** Always use the `with` context manager (`with requests.get(...) as response:`) when using `stream=True`. This guarantees the connection is closed regardless of how the block is exited.
