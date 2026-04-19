# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-23 - Optimizing Bulk File Processing
**Learning:** Build scripts that iterate over many markdown/MDX files (like finding the latest post) can suffer from O(N) read/parse bottlenecks if they `fs.readFileSync` and `gray-matter` parse every file during discovery.
**Action:** Use a two-pass algorithm: first pass parses filenames (or minimal metadata) to identify the target(s); second pass reads and parses only the contents of the identified target file(s).
