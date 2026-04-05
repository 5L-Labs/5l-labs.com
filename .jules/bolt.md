# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-23 - Build Script File Iteration Optimization
**Learning:** Build scripts that iterate over many files (like generating the latest post summary from N blog posts) become a critical bottleneck if they perform file system reads and parsing operations (e.g., `fs.readFileSync` and `matter(content)`) on every single file just to find a specific target.
**Action:** When finding a single target file based on filename metadata (like a date prefix), use a two-pass algorithm: first pass only inspects filenames via `fs.readdirSync` to identify the target, second pass performs the expensive I/O and parsing strictly on the identified file.
