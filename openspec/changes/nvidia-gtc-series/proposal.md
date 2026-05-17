## Why

After attending NVIDIA GTC 2026, we have a wealth of information from nearly 400 companies and sessions that need to be synthesized into a blog series. This change establishes the skeleton for these posts in `blog-applied-ai-engineering/` to ensure a consistent structure and early visibility of the upcoming content.

## What Changes

- Create an introductory blog post: `2026-03-22-nvidia-gtc-2026-intro.md`.
- Create skeleton files for 10 subsequent posts focusing on key themes:
  - Sovereign Clouds
  - Robotics
  - Cooling & Infrastructure
  - Blackwell & Networking
  - Software SDKs (NIMs)
  - Enterprise Consulting
  - Edge/Industrial Computing
  - AI-RAN & Telco
  - Security & Observability
  - Vertical AI (Healthcare, etc.)
- Add metadata and YAML frontmatter consistent with previous GTC posts.
- Flag sections for specific company data from the external `mkai/gtc2026` directory.

## Capabilities

### New Capabilities
- `gtc-2026-blog-series`: A series of blog posts covering insights from NVIDIA GTC 2026.

### Modified Capabilities
- None.

## Impact

- `blog-applied-ai-engineering/`: New markdown files will be added.
- `src/generated/latest-post.json`: Will be updated upon build if the intro post is the latest.
