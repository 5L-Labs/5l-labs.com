## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2026-01-28 - Image Optimization and CLS
**Learning:** Optimizing images (resizing/compressing) and adding explicit `width` / `height` attributes significantly reduces payload size and eliminates Cumulative Layout Shift (CLS), improving Core Web Vitals.
**Action:** Always inspect large image assets and optimize them. Ensure `img` tags have explicit dimensions.
