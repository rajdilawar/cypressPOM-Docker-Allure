# This repository contains an end-to-end test suite for the Weather Shopper website using Cypress, TypeScript, and the Page Object Model design pattern.

# The test runs within a Docker container, and for reporting purposes, I am using the Allure report.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Tests in Docker](#running-the-tests-in-docker)
- [Writing Tests](#writing-tests)
- [Page Objects](#page-objects)

## Prerequisites

Before proceeding, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- npm (npm is included with Node.js)
- Cypress
- TypeScript

## Getting Started

1. Clone or create a new project repository for your Cypress test automation framework.
2. Install Cypress by running the following command in your project root directory:

   ```bash
   npm install --save-dev typescript

   ```

3. Initialize Cypress by running the following command:
   ```bash
   npx cypress open
   ```
4. Configure TypeScript for Cypress:

   - Update your `tsconfig.json` file to include the necessary TypeScript configuration for Cypress.

## Running the Tests in Docker

To built the Docker image, execute the following command:

```bash
docker build -t cypresspom-docker .
```

To Run the tests in a Docker container, execute the following command:

```bash
docker run -it --rm cypresspom-docker
```

## Writing Tests

1. Create a new TypeScript file under the `e2e/` directory for each test script.
2. Import the necessary Cypress and page object modules at the top of your test script.
3. Write your test using Cypress commands and assertions, utilizing page objects for interacting with the web elements.
4. Export the test or group of tests if needed.

## Page Objects

1. Create a TypeScript file for each page object under the corresponding feature or page folder.
2. Define a class for each page object.
3. Declare the necessary web elements as class properties, using Cypress' `cy.get()` or `cy.contains()` commands to locate the elements.
4. Define methods for each action or interaction on the page, utilizing Cypress commands.
5. Export the page object class.

## Generate Allure report 

```bash
npm run test-allure
allure serve allure-results/
```
