# AI Agent Guidelines

## Engineering Preferences

These preferences shape all work on this project. Apply them before any other consideration.

- **DRY is about knowledge, not just text** — Flag logic duplication aggressively, but tolerate structural duplication if sharing it creates premature coupling (WET is better than the wrong abstraction).
- **Well-tested code is non-negotiable** — Test behavior, not implementation details. I prefer redundant coverage over missing edge cases, but ensure tests are resilient to refactoring.
- **Target "Engineered Enough"** — Handle current requirements + immediate edge cases. **Apply YAGNI**: do not build for hypothetical future use cases. Abstract only when you see the pattern for the third time (Rule of Three).
- **Err on the side of handling more edge cases, not fewer** — thoughtfulness > speed.
- **Bias toward explicit over clever.**

---

## Review Process (Plan Mode)

Before starting a review, you **MUST** ask:

> **BIG CHANGE or SMALL CHANGE?**
> 1. **BIG CHANGE**: Work through this interactively, one section at a time (Architecture → Code Quality → Tests → Performance) with at most 4 top issues in each section.
> 2. **SMALL CHANGE**: Work through interactively ONE question per review section.

### Review Sections

Walk through these four sections **in order**, presenting one section at a time. Wait for user feedback before proceeding to the next.

1. **Architecture review** — overall system design, component boundaries, dependency graph, coupling, data flow, scaling, security.
2. **Code quality review** — organization, module structure, DRY violations, error handling patterns, missing edge cases, tech debt hotspots, and over/under-engineering relative to preferences.
3. **Test review** — coverage gaps (unit, integration, e2e), test quality, assertion strength, missing edge cases, untested failure modes, and error paths.
4. **Performance review** — N+1 queries, database access patterns, memory-usage concerns, caching opportunities, slow or high-complexity code paths.

### Issue Format

For every specific issue (bug, smell, design concern, or risk):

- Describe the problem concretely, with file and line references.
- Present 2-3 options, including "do nothing" where reasonable.
- For each option, specify: implementation effort, risk, impact on other code, and **maintenance burden**.
- Give an opinionated recommendation and why, mapped to the engineering preferences.
- Explicitly ask whether the user agrees or wants a different direction before proceeding.

**Formatting Rules**:
- **NUMBER issues** (1, 2, 3...) and then give **LETTERS for options** (A, B, C...).
- The recommended option must always be the 1st option (Option A).
- When asking for selection, make sure each option clearly labels the issue NUMBER and option LETTER.

---

## Consolidated PR & Deployment Workflow

When consolidating multiple pull requests (local forks or upstream) into a unified branch, follow this mandatory process:

### 1. Consolidation & Baseline
- **Identify All PRs**: Fetch all branches from both `origin` and `upstream`.
- **Single Target Branch**: Create a new consolidation branch based on the latest `upstream/main`.
- **Sequential Merge**: Merge (or cherry-pick) all relevant PR branches. Resolve conflicts by prioritizing the project's architectural direction (e.g., standardizing on NPM over Bun).

### 2. Mandatory Verification (Multi-Layer)
- **Local Build**: Run the full build pipeline (e.g., `bun run build`). Verify that build scripts (like `prepare-build.js`) handle assets correctly.
- **Automated Logic/Security Tests**: Run all domain-specific tests (e.g., `uv run scripts/verify_security_fixes.py`).
- **CI Validation**: Verify that GitHub Actions pass for the consolidated branch.
- **Deployment Verification**:
    - **Render Check**: Monitor Render build logs. Do not declare success until the status is **LIVE**.
    - **Log Analysis**: Specifically check for environment-specific failures (e.g., Node.js version mismatches in Render Environment Groups).

### 3. Review Feedback Loop
- **Address AI/Automated Reviews**: Proactively check for and implement feedback from tools like `cubic-dev-ai` or `coderabbit`. 
- **Harden Infrastructure**: Apply fixes for shell safety (`execFileSync`), resource leaks (`response.close()`), and logic errors (off-by-one).

### 4. Finality & Cleanup
- **Upstream Merge**: Merge the final consolidated and tested PR into `upstream/main`.
- **PR Backlog Cleanup**: Close all redundant or superseded PRs across all remotes with the standard comment: `"Addressed via the new consolidated PR #[Number]"`.
- **Rebaseline Fork**: Once merged upstream, update the fork's `main` to match the new baseline.

---

## Cloud Prep, Local Finish

Cloud threads (Amp orbs) prepare work; the owner finishes and publishes it from their Mac.

1. **Prep in the cloud.** Research, write and check the change in the orb. Push it to a branch and open a **draft** PR. Keep personal details out of anything pushed: LAN IPs, device ids and serials, host and room names, internal ticket keys and Amp thread links.
2. **Hand off locally.** Start a thread on the owner's Mac runner (`Father.local`, under `/Users/njl/dev/src/external_websites` for website and public repos). It checks out the PR branch, opens the changed files, and reports path, branch, `git log` and `git status` without editing, committing or pushing.
3. **Finish locally.** The owner edits, cleans up and marks the PR ready or merges it.
4. **Publishing is the owner's call.** Do not merge, release or deploy from the cloud, including Render deploys, unless the owner asks for that specific action. Whether cloud threads may publish is deferred.
