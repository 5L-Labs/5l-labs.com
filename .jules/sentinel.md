## 2025-02-18 - Safe XML Parsing
**Vulnerability:** The `generate_embeddings.py` script used `xml.etree.ElementTree` to parse the sitemap, which is vulnerable to XXE attacks if the sitemap content is untrusted or tampered with.
**Learning:** Python's standard `xml` library is not secure against maliciously constructed data.
**Prevention:** Always use `defusedxml` when parsing XML data in Python.
