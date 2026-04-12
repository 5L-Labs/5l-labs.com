## 2025-02-21 - Content-Type Validation in Fetchers
**Vulnerability:** Python `requests` (and similar libraries) will happily stream any content type, allowing attackers to force a crawler to download and process unexpected binary files or large data streams.
**Learning:** Scripts that fetch content (like for embeddings or metadata) often check size limits but neglect `Content-Type`. This can waste resources or trigger errors in parsers.
**Prevention:** Always validate `Content-Type` headers against a strict allowlist (e.g., `text/html`, `application/xml`) *before* iterating over the response content.

## 2026-04-12 - Fix connection leak DoS in streaming requests
**Vulnerability:** The script `scripts/generate_embeddings.py` uses `requests.get` with `stream=True` but does not explicitly close the response on all exit paths (e.g., when returning early due to `Content-Length` limits or chunk bounds), leading to a connection/socket leak.
**Learning:** When using streaming responses, failing to fully consume the content or explicitly close the response leads to file descriptor exhaustion (DoS), particularly when looping over externally-sourced URLs where content bounds checking handles exceptions via early returns.
**Prevention:** Always use the context manager pattern (`with requests.get(...) as response:`) for streaming requests to ensure connections and underlying stream file descriptors are automatically and safely released regardless of how the function or block exits.
