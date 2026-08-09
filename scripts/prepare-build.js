const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

console.log('Running build preparation steps...');

// 1. Run generate-latest-post.js
const generatePostScript = path.join(__dirname, 'generate-latest-post.js');
console.log(`Executing ${generatePostScript}...`);
try {
    // Use execFileSync to execute the script directly without a shell for safety
    execFileSync('node', [generatePostScript], { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to run generate-latest-post.js:', error);
    process.exit(1);
}

// 2. Safely copy embeddings
const sourceDir = path.resolve(__dirname, '../embeddings');
const destDir = path.resolve(__dirname, '../static/embeddings');

console.log(`Copying embeddings from ${sourceDir} to ${destDir}...`);

// Ensure destination exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Check if source exists and is a directory (using statSync to follow symlinks)
if (fs.existsSync(sourceDir) && fs.statSync(sourceDir).isDirectory()) {
    try {
        // Check if directory is empty
        const files = fs.readdirSync(sourceDir);
        if (files.length === 0) {
             console.warn(`Warning: Embeddings source directory ${sourceDir} is empty. Skipping copy.`);
        } else {
            // Use fs.cpSync (Node 16.7+)
            if (fs.cpSync) {
                fs.cpSync(sourceDir, destDir, {
                    recursive: true,
                    force: true,
                    filter: (src) => !src.includes('.git') // Exclude .git
                });
            } else {
                 // Fallback
                 // Using cp -r might fail if empty or weird.
                 // Just walk and copy. But Node 18 supports cpSync.
                 console.warn("fs.cpSync not found (unexpected on Node 18+). Attempting cp command.");
                 execFileSync('cp', ['-r', `${sourceDir}/.`, `${destDir}/`], { stdio: 'inherit' });
            }
            console.log('Embeddings copied successfully.');
        }
    } catch (error) {
        console.warn('Warning: Failed to copy embeddings.', error.message);
        // Do not fail the build for this warning, unless critical.
    }
} else {
    console.warn(`Warning: Embeddings source directory ${sourceDir} not found. Skipping copy.`);
}

console.log('Build preparation complete.');
