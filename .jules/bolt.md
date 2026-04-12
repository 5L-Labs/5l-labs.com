# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.
## 2026-04-12 - File I/O Optimization in Build Scripts
**Learning:** In script operations parsing large amounts of files (like reading markdown for a latest post check), iterating through synchronous file reads and executing full string parsing (via `gray-matter`) on the main thread for *every file* just to find a timestamp creates massive overhead (O(N) operation).
**Action:** When finding a specific file based on filename metadata, separate the parsing into two passes. The first pass should read *only the minimal filenames* or cheap string metadata to identify the correct target file, then the second pass performs the expensive operations (like file reads and `gray-matter` extraction) *only on the identified target*, reducing overhead to O(1).
