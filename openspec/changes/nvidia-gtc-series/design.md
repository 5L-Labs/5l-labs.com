## Context

Establishing a skeleton for a multi-part blog series about NVIDIA GTC 2026. The series will be hosted in `blog-applied-ai-engineering/` and will reference data from an external directory (`~/dev/src/mkai/gtc2026/`).

## Goals / Non-Goals

**Goals:**
- Create a consistent structure for the GTC 2026 series.
- Provide clear placeholders for company-specific insights.
- Ensure all posts have correct Docusaurus/Markdown metadata.

**Non-Goals:**
- Writing the full content of all posts (this is for the user).
- Automating the extraction of data from the external directory (we will manually reference it).

## Decisions

- **File Naming:** Use `YYYY-MM-DD-nvidia-gtc-2026-<topic>.md` format to maintain chronological order and clarity.
- **Intro Post:** The first post will serve as a high-level recap and "table of contents" for the series.
- **Thematic Posts:** Subsequent posts will be grouped by theme (e.g., Robotics, Blackwell, Software/SDKs) based on the companies visited.
- **Placeholders:** Use a specific comment format `<!-- TODO: GTC Data - <Company/Topic> -->` to flag where info from the external directory is needed.

## Risks / Trade-offs

- **Risk:** The series structure might need to change as content is written.
- **Mitigation:** Keep the skeletons lightweight and easy to rename/reorganize.
- **Risk:** Access to `mkai/gtc2026` is manual.
- **Mitigation:** Clearly flag which company files need to be checked for each section.
