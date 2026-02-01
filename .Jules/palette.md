## 2025-02-18 - Generic "Read More" Links
**Learning:** Generic "Read More" links are problematic for screen reader users as they often navigate by links list, leaving them with multiple "Read More" links and no context.
**Action:** Always include an `aria-label` providing specific context, e.g., "Read more about [Post Title]", when the link text itself is generic.
## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2026-01-30 - Context for Icon-Only/Abbreviated Badges
**Learning:** Fixed position badges or icon-only elements with abbreviated text (like "OE") are ambiguous for both screen readers and visual users.
**Action:** Always provide `aria-label` for screen readers and `title` attributes for tooltips on such elements to explain their purpose.
