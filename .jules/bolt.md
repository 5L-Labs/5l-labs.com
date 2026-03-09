# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-24 - File IO Optimization for Builds
**Learning:** Reading and parsing the contents of every file in a directory to determine which one is the newest creates an O(N) performance bottleneck during build time. Synchronous operations also block the main thread.
**Action:** Always use an asynchronous two-pass algorithm: first pass parses filenames/metadata to identify the target, second pass reads and parses only the contents of the target file.
