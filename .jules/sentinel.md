## 2025-02-18 - Safe XML Parsing
**Vulnerability:** The `generate_embeddings.py` script used `xml.etree.ElementTree` to parse the sitemap, which is vulnerable to XXE attacks if the sitemap content is untrusted or tampered with.
**Learning:** Python's standard `xml` library is not secure against maliciously constructed data.
**Prevention:** Always use `defusedxml` when parsing XML data in Python.

## 2025-02-18 - [Render Security Headers for Docusaurus]
**Vulnerability:** Default Render configuration for static sites lacks HSTS and CSP headers, leaving the site vulnerable to MITM and XSS/Injection.
**Learning:** Docusaurus sites on Render require explicit header configuration in `render.yaml`. CSP must account for inline scripts (Docusaurus hydration) and external services (GA, GTM, Google Fonts, Iconify).
**Prevention:** Use the `headers` block in `render.yaml` with a carefully scoped CSP and HSTS.

## 2026-02-08 - [Unbounded Content Fetching DoS]
**Vulnerability:** The `generate_embeddings.py` script fetched external URLs without a size limit, potentially leading to memory exhaustion (DoS) if a large file or infinite stream was encountered.
**Learning:** `requests.get()` by default downloads the entire response body into memory.
**Prevention:** Always use `stream=True` with `requests.get()` and enforce a strict byte/size limit when iterating over the response content.

## 2026-02-18 - [SSRF in Embedding Generation]
**Vulnerability:** The `generate_embeddings.py` script fetched arbitrary URLs from the sitemap if they didn't match the expected base URL, allowing SSRF.
**Learning:** Relying on string replacement without prior validation allows attackers to bypass expected URL constraints.
**Prevention:** Strictly validate that input URLs match the expected base URL before processing or fetching content.
