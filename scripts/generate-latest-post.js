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
    let latestPostMeta = null;
    const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})/;

    // Pass 1: Identify the newest file without reading contents
    // This optimization avoids an O(N) read/parse bottleneck by only parsing the frontmatter of the single newest file.
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

            if (!latestPostMeta || date > latestPostMeta.date) {
                latestPostMeta = {
                    date,
                    file,
                    dirPath,
                    dir,
                    yearStr,
                    monthStr,
                    dayStr
                };
            }
        });
    });

    if (!latestPostMeta) return null;

    // Pass 2: Perform the expensive fs.readFileSync and matter(content) ONLY on the newest file
    const { date, file, dirPath, dir, yearStr, monthStr, dayStr } = latestPostMeta;
    const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
    const { data, content: markdownContent } = matter(content);

    let postContent = '';
    if (data.description) {
        postContent = data.description;
    } else {
        postContent = stripMarkdown(markdownContent);
    }

    const truncated = postContent.length > 550 ? postContent.substring(0, 550) + '...' : postContent;

    const slug = data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/, '');

    const routeBasePath = dir.replace('blog-', '');

    let url;
    if (data.slug) {
        url = `/${routeBasePath}/${data.slug}`;
    } else {
        url = `/${routeBasePath}/${yearStr}/${monthStr}/${dayStr}/${slug}`;
    }

    return {
        date: date,
        title: data.title || slug,
        content: truncated,
        url: url
    };
}

const latestPost = getLatestPost();

if (latestPost) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(latestPost, null, 2));
    console.log(`Latest post generated: ${latestPost.title}`);
} else {
    console.log('No blog posts found.');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({}, null, 2));
}
