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

// ⚡ Bolt Optimization:
// Use a two-pass algorithm to avoid reading the contents of every blog post file.
// Pass 1: Asynchronously read directory listings and parse dates from filenames to identify the latest post.
// Pass 2: Asynchronously read and parse only the single latest file's content.
async function getLatestPost() {
    let latestFileMeta = null;

    // Pass 1: Find the latest file by scanning directories and parsing filenames
    for (const dir of BLOG_DIRS) {
        const dirPath = path.join(__dirname, '..', dir);

        try {
            await fs.promises.access(dirPath);
        } catch (error) {
            continue; // Directory does not exist
        }

        const files = await fs.promises.readdir(dirPath);
        for (const file of files) {
            if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

            // Extract date from filename (YYYY-MM-DD-...)
            const match = file.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (!match) continue;

            const [_, yearStr, monthStr, dayStr] = match;
            const date = new Date(`${yearStr}-${monthStr}-${dayStr}`);

            if (!latestFileMeta || date > latestFileMeta.date) {
                latestFileMeta = {
                    dirPath,
                    dir,
                    file,
                    date,
                    yearStr,
                    monthStr,
                    dayStr
                };
            }
        }
    }

    if (!latestFileMeta) return null;

    // Pass 2: Read and parse the content of only the latest file
    const { dirPath, dir, file, date, yearStr, monthStr, dayStr } = latestFileMeta;

    const content = await fs.promises.readFile(path.join(dirPath, file), 'utf-8');
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

(async () => {
    try {
        const latestPost = await getLatestPost();

        if (latestPost) {
            await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify(latestPost, null, 2));
            console.log(`Latest post generated: ${latestPost.title}`);
        } else {
            console.log('No blog posts found.');
            await fs.promises.writeFile(OUTPUT_FILE, JSON.stringify({}, null, 2));
        }
    } catch (err) {
        console.error('Error generating latest post:', err);
        process.exit(1);
    }
})();
