## 2025-02-21 - Content-Type Validation in Fetchers
**Vulnerability:** Python `requests` (and similar libraries) will happily stream any content type, allowing attackers to force a crawler to download and process unexpected binary files or large data streams.
**Learning:** Scripts that fetch content (like for embeddings or metadata) often check size limits but neglect `Content-Type`. This can waste resources or trigger errors in parsers.
**Prevention:** Always validate `Content-Type` headers against a strict allowlist (e.g., `text/html`, `application/xml`) *before* iterating over the response content.
