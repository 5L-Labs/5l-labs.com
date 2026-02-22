# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.
