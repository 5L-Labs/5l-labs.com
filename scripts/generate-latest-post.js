const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIRS = [
    'blog-self-hosted-iot',
    'blog-applied-home-ml-iot',
    'blog-applied-ai-engineering',
    'blog-frontier-research'
];

const OUTPUT_FILE = path.join(__dirname, '../src/generated/latest-post.json');

const TRUNCATE_RE = /<!-- truncate -->[\s\S]*$/;
const HTML_TAGS_RE = /<[^>]*>/g;
const IMAGES_RE = /!\[(.*?)\]\(.*?\)/g;
const LINKS_RE = /\[(.*?)\]\(.*?\)/g;
const HEADINGS_RE = /^#+\s+/gm;
const BLOCKQUOTES_RE = /^>\s+/gm;
const CODE_BLOCKS_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`([^`]+)`/g;
const BOLD_ITALIC_RE = /[*_]{1,3}(.*?)[*_]{1,3}/g;
const HR_RE = /^-{3,}$/gm;
const NEWLINES_RE = /\n+/g;

function stripMarkdown(markdown) {
    if (!markdown) return '';
    return markdown
        .replace(TRUNCATE_RE, '') // Remove everything after truncate
        .replace(HTML_TAGS_RE, '') // Remove HTML tags
        .replace(IMAGES_RE, '') // Remove images
        .replace(LINKS_RE, '$1') // Remove links but keep text
        .replace(HEADINGS_RE, '') // Remove headings
        .replace(BLOCKQUOTES_RE, '') // Remove blockquotes
        .replace(CODE_BLOCKS_RE, '') // Remove code blocks
        .replace(INLINE_CODE_RE, '$1') // Remove inline code
        .replace(BOLD_ITALIC_RE, '$1') // Remove bold/italic
        .replace(HR_RE, '') // Remove hr
        .replace(NEWLINES_RE, ' ') // Collapse newlines
        .trim();
}

function getLatestPost() {
    let latestFile = null;
    let latestDate = null;
    let latestDir = null;
    let latestMatch = null;

    const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})/;

    // Pass 1: Find the latest file by just reading filenames
    // This optimization avoids O(N) file system reads and markdown parsing.
    // We only inspect the filenames and find the most recent date.
    BLOG_DIRS.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) return;

        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;

            // Extract date from filename (YYYY-MM-DD-...)
            const match = file.match(DATE_REGEX);
            if (!match) return;

            const [_, yearStr, monthStr, dayStr] = match;
            const date = new Date(`${yearStr}-${monthStr}-${dayStr}`);

            if (!latestDate || date > latestDate) {
                latestDate = date;
                latestFile = file;
                latestDir = dir;
                latestMatch = match;
            }
        });
    });

    // Pass 2: Read and parse ONLY the latest file
    if (latestFile) {
        const dirPath = path.join(__dirname, '..', latestDir);
        const [_, yearStr, monthStr, dayStr] = latestMatch;
        const content = fs.readFileSync(path.join(dirPath, latestFile), 'utf-8');
        const { data, content: markdownContent } = matter(content);

        let postContent = '';
        if (data.description) {
            postContent = data.description;
        } else {
            postContent = stripMarkdown(markdownContent);
        }

        const truncated = postContent.length > 550 ? postContent.substring(0, 550) + '...' : postContent;
        const slug = data.slug || latestFile.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/, '');
        const routeBasePath = latestDir.replace('blog-', '');

        let url;
        if (data.slug) {
            url = `/${routeBasePath}/${data.slug}`;
        } else {
            url = `/${routeBasePath}/${yearStr}/${monthStr}/${dayStr}/${slug}`;
        }

        return {
            date: latestDate,
            title: data.title || slug,
            content: truncated,
            url: url
        };
    }

    return null;
}

const latestPost = getLatestPost();

if (latestPost) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(latestPost, null, 2));
    console.log(`Latest post generated: ${latestPost.title}`);
} else {
    console.log('No blog posts found.');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({}, null, 2));
}
