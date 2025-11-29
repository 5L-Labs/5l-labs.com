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

function getLatestPost() {
    let latestPost = null;

    BLOG_DIRS.forEach(dir => {
        const dirPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(dirPath)) return;

        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;

            // Extract date from filename (YYYY-MM-DD-...)
            const match = file.match(/^(\d{4}-\d{2}-\d{2})/);
            if (!match) return;

            const dateStr = match[1];
            const date = new Date(dateStr);

            if (!latestPost || date > latestPost.date) {
                const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
                const { data, content: markdownContent } = matter(content);

                // Keep markdown but truncate
                const postContent = markdownContent.trim();
                const truncated = postContent.length > 150 ? postContent.substring(0, 150) + '...' : postContent;

                latestPost = {
                    date: date,
                    title: data.title || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/, ''),
                    content: truncated,
                    url: `/${dir.replace('blog-', '')}/${file.replace(/\.(md|mdx)$/, '')}`
                };
            }
        });
    });

    return latestPost;
}

const latestPost = getLatestPost();

if (latestPost) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(latestPost, null, 2));
    console.log(`Latest post generated: ${latestPost.title}`);
} else {
    console.log('No blog posts found.');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({}, null, 2));
}
