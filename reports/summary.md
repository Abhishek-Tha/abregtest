## ❌ BlockGuard Regression Report

**Status:** `FAILED` &nbsp;|&nbsp; **Run:** `bg-1785137047659`

### Changed Blocks
- `cards`
- `columns`
- `fragment`

### Impact
- **3** pages use the affected blocks
- **12** pages tested across **mobile-base, mobile-900, desktop-900, desktop-max** viewports
- **0** pages skipped (selection limit)
- Mode: **representative**

### Results

| Passed | Warnings | Failed | Unable to Test |
|--------|----------|--------|----------------|
| 0 | 0 | 12 | 0 |

### ❌ Failures
- **/home** (desktop-max): Visual diff 60.0% exceeds failure threshold (3% for scope="block", viewport="desktop-max")
- **/home** (desktop-900): Visual diff 66.5% exceeds failure threshold (3% for scope="block", viewport="desktop-900")
- **/home** (mobile-base): Visual diff 74.7% exceeds failure threshold (3% for scope="block", viewport="mobile-base")
- **/** (mobile-base): Visual diff 74.4% exceeds failure threshold (3% for scope="block", viewport="mobile-base")
- **/** (mobile-900): Visual diff 64.9% exceeds failure threshold (3% for scope="block", viewport="mobile-900")
- **/home** (mobile-900): Visual diff 67.5% exceeds failure threshold (3% for scope="block", viewport="mobile-900")
- **/** (desktop-900): Visual diff 65.9% exceeds failure threshold (3% for scope="block", viewport="desktop-900")
- **/** (desktop-max): Visual diff 43.0% exceeds failure threshold (3% for scope="block", viewport="desktop-max")
- **/landing** (mobile-900): Visual diff 65.6% exceeds failure threshold (3% for scope="block", viewport="mobile-900")
- **/landing** (mobile-base): Visual diff 74.4% exceeds failure threshold (3% for scope="block", viewport="mobile-base")
- **/landing** (desktop-900): Visual diff 66.7% exceeds failure threshold (3% for scope="block", viewport="desktop-900")
- **/landing** (desktop-max): Visual diff 59.4% exceeds failure threshold (3% for scope="block", viewport="desktop-max")





---
<details><summary>Full report</summary>

See attached workflow artifact `blockguard-report/index.html` for before/after/diff screenshots.

</details>

<!-- blockguard-report-marker -->