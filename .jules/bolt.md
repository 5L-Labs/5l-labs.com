# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-23 - Build Script O(N) Read Optimization
**Learning:** Build scripts that iterate chronologically over files (like finding the latest post) can suffer from O(N) I/O and parsing overhead if they indiscriminately read and parse every file that is newer than the *current* maximum.
**Action:** When finding the newest file, use a two-pass algorithm. First pass: iterate over directory listings and identify the target file using only filenames (and regex matches on dates in the filename). Second pass: perform expensive file reads (`fs.readFileSync`) and parsing (e.g., `gray-matter`) *only* on the single target file.
