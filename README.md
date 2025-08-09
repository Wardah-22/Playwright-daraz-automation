# Playwright Automation Testing Assignment

## 📌 Assignment Overview
This repository contains my **Playwright Automation Testing Assignment**.  
The objective was to use **Playwright** to automate testing for a given website and ensure all test cases pass successfully.

---

## 🛠️ Steps Taken

1. **Environment Setup**
   - Installed [Node.js](https://nodejs.org/) (Latest LTS version)
   - Installed Playwright globally using:
     ```bash
     npm install -g playwright
     ```
   - Created a project folder and initialized Node.js:
     ```bash
     npm init -y
     ```
   - Installed Playwright locally:
     ```bash
     npm install @playwright/test
     ```
   - Installed Playwright browsers:
     ```bash
     npx playwright install
     ```

2. **Project & Test Setup**
   - Created a `tests/` folder to store test files.
   - Wrote automation scripts in `.spec.js` format according to assignment requirements.
   - Used Playwright’s **Test Runner** for execution.

3. **Test Execution**
   - Ran all tests using:
     ```bash
     npx playwright test
     ```
   - Verified that **all tests passed successfully** ✅

4. **Results**
   - All test cases passed without any errors.
   - Verified expected output through screenshots & console logs.

