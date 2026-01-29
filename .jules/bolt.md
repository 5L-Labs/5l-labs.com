## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-05-24 - Hero Image Optimization & CLS
**Learning:** Large unoptimized images in the hero section are a primary cause of slow LCP and CLS. Providing explicit `width` and `height` attributes to the `img` tag, even if overridden by CSS, allows the browser to reserve the correct aspect ratio space immediately.
**Action:** Always optimize hero images (compress/resize) and define explicit dimensions to prevent layout shifts.
