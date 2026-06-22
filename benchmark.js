const { performance } = require('perf_hooks');

const conceptTopics = Array.from({length: 20}, (_, i) => ({ slug: `topic-${i}` }));

function withoutMemo(selected) {
    return conceptTopics.find((item) => item.slug === selected) ?? conceptTopics[0];
}

let cachedTopic = null;
let lastSelected = null;
function withMemo(selected) {
    if (selected !== lastSelected) {
        cachedTopic = conceptTopics.find((item) => item.slug === selected) ?? conceptTopics[0];
        lastSelected = selected;
    }
    return cachedTopic;
}

const ITERATIONS = 5000000;
const target = 'topic-15';

// Warmup
for (let i = 0; i < 10000; i++) {
    withoutMemo(target);
    withMemo(target);
}

const start1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    withoutMemo(target);
}
const end1 = performance.now();

const start2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    withMemo(target);
}
const end2 = performance.now();

console.log(`Baseline (no memoization): ${(end1 - start1).toFixed(2)} ms`);
console.log(`Optimized (with memoization): ${(end2 - start2).toFixed(2)} ms`);
console.log(`Improvement: ${((end1 - start1) / (end2 - start2)).toFixed(2)}x faster`);
