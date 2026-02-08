## 2024-05-22 - [Context for Generic Links]
**Learning:** Generic "Read More" or "Learn More" links in cards are confusing for screen reader users.
**Action:** Always add `aria-label` with specific context (e.g., "Read more about [Title]") to these links.
## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").
