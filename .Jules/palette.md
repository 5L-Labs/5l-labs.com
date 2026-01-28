## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2025-05-24 - Accessibility for Icon-Only Badges
**Learning:** Abbreviated icon-only badges (like "OE") provide no context to screen reader users and can be confusing.
**Action:** Always pair icon-only or abbreviated links with `aria-label` for screen readers and `title` for mouse tooltips to explain the destination.
