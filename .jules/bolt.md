# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-03-05 - File System Search Optimization
**Learning:** When a build script needs to search through numerous files to find a specific one based on metadata in the filename (like the newest date), parsing the file contents (e.g., using `matter()`) inside the search loop results in an O(N) performance bottleneck.
**Action:** Use a two-pass algorithm. The first pass should only read directory entries to identify the target file, and the second pass should read and parse only the content of that identified target file.
