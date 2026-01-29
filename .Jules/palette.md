## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2026-01-29 - Accessible Badges
**Learning:** Floating badges often use abbreviations (like "OE") which are meaningless to screen readers and some users.
**Action:** Always include `aria-label` for screen readers and `title` for hover tooltips on such elements.
