# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-03-01 - I/O Bottleneck in File Parsing
**Learning:** Parsing frontmatter (`matter(content)`) on every file during a directory scan to identify the "latest" item is an expensive $O(N)$ operation. In environments with many files, this causes significant latency. By separating candidate selection (using regex on the filename date) from content parsing, the heavy I/O and text processing becomes an $O(1)$ operation performed only on the final result.
**Action:** When writing scripts that scan directories to identify a single target file based on metadata present in the filename (like a date), defer any `fs.readFileSync` or parsing functions until *after* the final file is selected to minimize I/O overhead.