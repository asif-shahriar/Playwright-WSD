# Playwright Web/API Automation
A robust end-to-end testing framework built using [Playwright](https://playwright.dev) with a Page Object Model (POM) structure

---

## Project Structure
```
Project/
│
├── tests/                       # All test specs go here
│   └── sample.spec.ts
│
├── page-objects/                       # Page Object Model classes
│   └── sample_page.ts
│
├── helpers/                   # Utility/helper functions
│   └── helper.ts
│
├── playwright.config.ts         # Main Playwright configuration
├── package.json                 # Node.js dependencies and scripts
└── README.md                    # Project documentation


```
## Prerequisites
- Node.js (18+ recommended)
- Configure **NODE_HOME**
---
## How to run this project
* Clone the repo
* Open cmd in the root folder
* Give following commands sequentially:
#### Install dependencies 
```
npm install
```
```
npm install -D @playwright/test
```
#### Test Execution Commands

| Purpose                                | Command                                                                 |
|----------------------------------------|-------------------------------------------------------------------------|
| Run the project in **headed mode**     | ```npx playwright test --grep="TC-01" --headed```                              |
| Run the project in **headless mode**   | `npx playwright test --grep="TC-01"                                       |
| Run the project in **debug mode**      | `npx playwright test --grep="TC-01" --debug`                               |
| Run tests with **chromium** browser          | `npx playwright test --project="chromium" --headed`             |
| Run tests with **firefox** browser          | `npx playwright test --project="firefox" --headed`             |
| Run tests with **webkit** browser          | `npx playwright test --project="webkit" --headed`             |
| Run tests with **Generative AI** | `npx playwright codegen` |
---