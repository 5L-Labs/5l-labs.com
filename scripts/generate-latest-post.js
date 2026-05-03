const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Single source of truth for area labels — shared with src/config/homepage.js
// blog-misc is intentionally excluded: no registered routeBasePath in docusaurus.config.js.
const AREA_LABELS = require('../src/config/areas.json');
const BLOG_DIRS = Object.keys(AREA_LABELS);

const LATEST_OUTPUT = path.join(__dirname, '../src/generated/latest-post.json');
const ALL_OUTPUT    = path.join(__dirname, '../src/generated/all-posts.json');

// Supports both <!-- truncate --> (.md) and {/* truncate */} (.mdx)
const TRUNCATE_RE    = /(?:<!-- truncate -->|\{\/\* truncate \*\/\})[\s\S]*$/;
const HTML_TAGS_RE   = /<[^>]*>/g;
const IMAGES_RE      = /!\[(.*?)\]\(.*?\)/g;
const LINKS_RE       = /\[(.*?)\]\(.*?\)/g;
const HEADINGS_RE    = /^#+\s+/gm;
const BLOCKQUOTES_RE = /^>\s+/gm;
const CODE_BLOCKS_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`([^`]+)`/g;
const LIST_ITEMS_RE  = /^[\*\-\+]\s+/gm;   // must run before BOLD_ITALIC_RE
const BOLD_ITALIC_RE = /[*_]{1,3}(.*?)[*_]{1,3}/g;
const HR_RE          = /^-{3,}$/gm;
const NEWLINES_RE    = /\n+/g;

function stripMarkdown(markdown) {
    if (!markdown) return '';
    return markdown
        .replace(TRUNCATE_RE, '')
        .replace(HTML_TAGS_RE, '')
        .replace(IMAGES_RE, '')
        .replace(LINKS_RE, '$1')
        .replace(HEADINGS_RE, '')
        .replace(BLOCKQUOTES_RE, '')
        .replace(CODE_BLOCKS_RE, '')
        .replace(INLINE_CODE_RE, '$1')
        .replace(LIST_ITEMS_RE, '')
        .replace(BOLD_ITALIC_RE, '$1')
        .replace(HR_RE, '')
        .replace(NEWLINES_RE, ' ')
        .trim();
}

function getAllPosts() {
    const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})/;
    const posts = [];

    BLOG_DIRS.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) return;

        const routeBase = dir.replace('blog-', '');
        const area = AREA_LABELS[dir];

        fs.readdirSync(dirPath).forEach(file => {
            if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;

            const match = file.match(DATE_REGEX);
            if (!match) return;
            const [_, yearStr, monthStr, dayStr] = match;
            const date = new Date(`${yearStr}-${monthStr}-${dayStr}`);

            const raw = fs.readFileSync(path.join(dirPath, file), 'utf-8');
            const { data, content: markdownContent } = matter(raw);

            const slug = data.slug ||
                file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/, '');

            const url = data.slug
                ? `/${routeBase}/${data.slug}`
                : `/${routeBase}/${yearStr}/${monthStr}/${dayStr}/${slug}`;

            let excerpt = data.description || stripMarkdown(markdownContent);
            if (excerpt.length > 550) excerpt = excerpt.substring(0, 550) + '...';

            posts.push({
                date:      date.toISOString(),
                dateLabel: `${yearStr}-${monthStr}-${dayStr}`,
                title:     data.title || slug,
                area,
                type:      data.type || 'writing',
                url,
                excerpt,
            });
        });
    });

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

const allPosts = getAllPosts();

fs.writeFileSync(ALL_OUTPUT, JSON.stringify(allPosts, null, 2));
console.log(`All posts generated: ${allPosts.length} entries`);

if (allPosts.length) {
    const latest = allPosts[0];
    fs.writeFileSync(LATEST_OUTPUT, JSON.stringify({
        date:    latest.date,
        title:   latest.title,
        content: latest.excerpt,
        url:     latest.url,
    }, null, 2));
    console.log(`Latest post generated: ${latest.title}`);
} else {
    fs.writeFileSync(LATEST_OUTPUT, JSON.stringify({}, null, 2));
}
