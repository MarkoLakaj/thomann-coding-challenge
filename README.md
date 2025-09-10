# Thomann Coding Solution

This repository contains an automated end-to-end test suite for the [Thomann.io](https://www.thomann.de) page.  
The framework is built with [Playwright](https://playwright.dev/) in **TypeScript**, following the Page Object Model pattern.

---

## 🚀 Setup & Run

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install dependencies
```bash
npm ci
```

### Install browsers
```bash
npx playwright install --with-deps
```

### Run tests
```bash
npx playwright test
```

### View HTML report
```bash
npx playwright show-report
```

---

## 🧩 Project Structure
```
.
├── page-objects/        # Page Object classes (encapsulation of selectors & actions)
├── tests/               # Test files
├── utils/               # Helpers (e.g. whitespace normalizer, random selection)
├── playwright.config.ts # Playwright configuration
└── .github/workflows/   # CI pipeline (GitHub Actions)
```

---

## ✅ Current Capabilities
- Page Object Model with clear separation of concerns
- Test ensures that the correct cable product is added to basket
- Runs in GitHub Actions with artifact upload of Playwright HTML report
- Helper utilities for normalization & random selections

---

## 🔮 Future Improvements

- **Introduce a proper logger** for better traceability in CI and local runs.
- **Investigate flakiness**: test sometimes fails due to mismatch between manufacturer names on the product page and item list page.  
  - Assumption: **bug in app**. If not, improve test logic to handle discrepancies gracefully.
- **Test hooks**: move `acceptCookies` logic into `beforeAll`/`beforeEach`.
- **Use fixtures** to ensure setting up and reusing test context, data, and dependencies.
- **More appealing reports**: integrate [Allure Playwright Reporter](https://allurereport.org/docs/playwright/) for interactive reports.
- **Cross-browser coverage**: add Firefox and WebKit to config for broader compatibility.
- **Cross-platform coverage**: add support for mobile testing
- **Environment config**: support multiple environments (staging, prod) via env vars.

---

## 📊 CI Integration
- GitHub Actions pipeline runs on every push and PR.
- Test results are uploaded as an artifact: **`playwright-report/`**.  
  - Navigate to your GitHub Actions run → **Artifacts** → download and open `index.html`.

---

## 📌 Notes
- Tests rely on selectors from the Thomann.io CableGuy page, which may change in the future.
- Currently, some waits (`waitForTimeout`) are brute-forced to save time in the coding challenge — these should be replaced with proper synchronization.
