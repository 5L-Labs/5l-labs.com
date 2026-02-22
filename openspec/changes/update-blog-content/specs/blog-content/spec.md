## ADDED Requirements
### Requirement: Blog Post Quality and Structure
All blog posts MUST be complete, factually accurate, and follow a consistent metadata structure.

#### Scenario: content completeness
- **WHEN** a blog post is published
- **THEN** it must not contain placeholder text like "To be updated"
- **AND** it must provide logical, useful information relevant to the title

#### Scenario: metadata structure
- **WHEN** a blog post is created or updated
- **THEN** it must include a `description` field in the frontmatter
- **AND** it must include an `embedding_url` field in the frontmatter, relative to the slug
