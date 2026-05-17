## ADDED Requirements

### Requirement: Introductory Blog Post
The system SHALL have an introductory blog post for the NVIDIA GTC 2026 series.

#### Scenario: Intro post existence
- **WHEN** the file `blog-applied-ai-engineering/2026-03-22-nvidia-gtc-2026-intro.md` is created
- **THEN** it MUST contain frontmatter with `slug: nvidia-gtc-2026-intro`, `title: NVIDIA GTC 2026: The AI Factory Era`, and `tags: [nvidia, gtc, ai, robotics]`.

### Requirement: Thematic Post Skeletons
The system SHALL have at least 10 thematic post skeletons for the series.

#### Scenario: Thematic post structure
- **WHEN** a thematic post file is created (e.g., `2026-03-23-nvidia-gtc-2026-robotics.md`)
- **THEN** it MUST contain placeholders for company data referencing the `mkai/gtc2026` directory.

### Requirement: Metadata Consistency
All posts in the series SHALL follow the existing metadata standards of the `blog-applied-ai-engineering` directory.

#### Scenario: Metadata check
- **WHEN** a new post is added to the series
- **THEN** it MUST include `authors`, `tags`, and `description` in its frontmatter.
