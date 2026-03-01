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

function stripMarkdown(markdown) {
    if (!markdown) return '';
    return markdown
        .replace(/<!-- truncate -->[\s\S]*$/, '') // Remove everything after truncate
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/!\[(.*?)\]\(.*?\)/g, '') // Remove images
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
        .replace(/^#+\s+/gm, '') // Remove headings
        .replace(/^>\s+/gm, '') // Remove blockquotes
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`([^`]+)`/g, '$1') // Remove inline code
        .replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, '$1') // Remove bold/italic
        .replace(/^-{3,}$/gm, '') // Remove hr
        .replace(/\n+/g, ' ') // Collapse newlines
        .trim();
}

function getLatestPost() {
    let latestCandidate = null;

    BLOG_DIRS.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) return;

        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;

            // Extract date from filename (YYYY-MM-DD-...)
            const match = file.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (!match) return;

            const [_, yearStr, monthStr, dayStr] = match;
            const date = new Date(`${yearStr}-${monthStr}-${dayStr}`);

            // ⚡ Bolt: Optimize by only tracking the candidate file and deferring fs.readFileSync
            // to the very end. Reduces unnecessary I/O when iterating over multiple files.
            if (!latestCandidate || date > latestCandidate.date) {
                latestCandidate = {
                    date, file, dirPath, dir, yearStr, monthStr, dayStr
                };
            }
        });
    });

    if (!latestCandidate) return null;

    const { dirPath, file, date, dir, yearStr, monthStr, dayStr } = latestCandidate;

    // ⚡ Bolt: Only read and parse frontmatter for the final latest candidate
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
