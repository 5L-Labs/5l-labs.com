# Change: Update Blog Content

## Why
The current blog posts contain incomplete drafts, placeholders ("To be updated"), and lack consistent metadata. Updating them will provide valuable content to readers while maintaining the original author's voice and improving SEO/discoverability through structured metadata.

## What Changes
- **Content Refinement**:
  - Update `blog-applied-ai-engineering/*.md`
  - Update `blog-applied-home-ml-iot/*.md`
  - Update `blog-frontier-research/*.md`
  - Fill in "To be updated" sections with logical, useful information.
  - Minimal word changes to existing content; focus on additions and clarity.
  - Ensure factual accuracy and cite sources.
- **Metadata Enhancement**:
  - Add a `description` frontmatter field to all posts.
  - Add an `embedding_url` frontmatter field (relative to slug).
- **Standardization**:
  - Maintain original author's voice.
  - Use industry-standard jargon with definitions.
  - Add a note at the end of each updated post: "*This post was cleaned up with Automation to clarify thoughts for the reader.*"

## Impact
- **Affected Specs**: `blog-content` (New capability)
- **Affected Code**: Markdown files in `blog-*` directories.
- **Breaking Changes**: None.
