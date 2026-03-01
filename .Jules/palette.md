## 2025-02-18 - Generic "Read More" Links
**Learning:** Generic "Read More" links are problematic for screen reader users as they often navigate by links list, leaving them with multiple "Read More" links and no context.
**Action:** Always include an `aria-label` providing specific context, e.g., "Read more about [Post Title]", when the link text itself is generic.

## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2026-01-30 - Context for Icon-Only/Abbreviated Badges
**Learning:** Fixed position badges or icon-only elements with abbreviated text (like "OE") are ambiguous for both screen readers and visual users.
**Action:** Always provide `aria-label` for screen readers and `title` attributes for tooltips on such elements to explain their purpose.

## 2026-02-08 - SSG Hydration and Semantic Dates
**Learning:** `toLocaleDateString()` without fixed locale arguments and explicit `timeZone` causes hydration mismatches in SSG sites (like Docusaurus) between server build and client browser. Also, generic `<span>` or `<small>` for dates lacks semantic meaning.
**Action:** Use the `<time>` element with `dateTime` attribute, fixed locale/options, and explicit `timeZone: 'UTC'` for date formatting to ensure consistency and accessibility.

## 2026-02-08 - Render Build Commands for Custom Scripts
**Learning:** `npx docusaurus build` in `render.yaml` bypasses `package.json` scripts. If a project relies on pre-build scripts (e.g., generating content), using the framework command directly causes build failures due to missing assets.
**Action:** Always use `bun run build` (or equivalent) in `render.yaml` to ensure the full build pipeline defined in `package.json` is executed.

## 2026-02-08 - Dependencies for Production Build
**Learning:** Build tools like `tailwindcss`, `postcss`, and `autoprefixer` are often needed during the production build of static sites. If they are in `devDependencies`, `bun install --production` (default on platforms like Render) will skip them, causing build failures.
**Action:** Move build-critical tools from `devDependencies` to `dependencies` in `package.json` to ensure they are available in the production environment.

## 2026-02-08 - Badge Positioning and Focus Visibility
**Learning:** Fixed position elements in the bottom-right corner often conflict with standard "Back to Top" buttons or chat widgets, frustrating users. Additionally, relying solely on `:hover` for visual feedback excludes keyboard users.
**Action:** Move fixed badges to the bottom-left and always implement `:focus-visible` styles with a distinct focus ring to ensure accessibility and avoid layout conflicts.

## 2026-02-09 - Focus Indicators for Custom Interactive Elements
**Learning:** Custom-styled interactive elements (like fixed badges) often lose default browser focus outlines or have insufficient contrast.
**Action:** Always add explicit `:focus-visible` styles (e.g., `outline`, `box-shadow`, `transform`) to ensure keyboard users can clearly see where they are navigating.

## 2026-02-12 - Visual Affordance in Lists
**Learning:** Plain text lists of links lack visual affordance and scannability.
**Action:** Add subtle directional indicators (like arrows) to links in lists and ensure they are `aria-hidden` to avoid redundancy for screen readers.

## 2026-02-16 - Bun Lockfile Compatibility
**Learning:** Render's default environment may not support modern text-based `bun.lock` files, causing deployment failures.
**Action:** If deployment fails with Bun, switch to standard Node/NPM for greater compatibility, especially for static site generation. Ensure `package-lock.json` is not ignored in `.gitignore`.

## 2026-02-18 - External Link Indicators
**Learning:** Exposing hidden content & using distinct indicators for external links improves discoverability and sets clear expectations.
**Action:** Use an `ExternalLinkIcon` (e.g., arrow up-right) for external links in lists to differentiate them from internal navigation.

## 2026-03-01 - External Links and Interactive Icons
**Learning:** Setting `aria-hidden="true"` on custom external link icons prevents screen readers from announcing that the link opens in a new tab. Additionally, using only `hover` classes on interactive icons within a link omits keyboard users from seeing the same visual interactions.
**Action:** Always assign `role="img"` and `aria-label="(opens in new tab)"` to SVG icons indicating external links. Furthermore, apply equivalent `focus-visible` classes to any hover interactions inside interactive elements to ensure visual feedback parity for keyboard users.
