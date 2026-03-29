# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-03-22 - Two-Pass Algorithm for Build Scripts
**Learning:** Build scripts that search for specific files (e.g., finding the newest post) can suffer from O(N) read/parse bottlenecks if they process every file.
**Action:** Use an asynchronous or two-pass algorithm: first pass parses filenames/metadata to identify the target, second pass reads and parses only the contents of the target file to avoid expensive operations.
