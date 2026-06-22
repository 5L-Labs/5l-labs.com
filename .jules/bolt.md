## 2024-05-15 - Memoize array lookups in React renders

**Learning:** Array search operations like `.find()` inside React component render functions can cause unnecessary performance overhead, especially on frequent re-renders or with larger datasets, because they are executed on every single render cycle.
**Action:** Use `useMemo` to cache the results of these array lookups, declaring dependencies appropriately, to prevent redundant iterations. Also, when benchmarking React micro-optimizations that are hard to isolate in the lifecycle, use standalone Node.js scripts with `perf_hooks` for quantitative baselines.
