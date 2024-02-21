# Roll It

An project for playing RPG with your friends in person

## Installation

Clone the repository

```bash
  git clone https://github.com/brunomestanza/roll-it-frontend.git
```

Install all the dependencies

```bash
  pnpm install
```
    
## Run with mocked API

Start the server in test mode

```bash
  pnpm run dev:test
```

Important: In this mode, it uses the .env.test file, so its not required to have the .env.local file. The .env.local is only required to run it with an BackEnd.

## Running Tests

To run unit tests, run the following command

```bash
  pnpm run test
```

To run e2e tests, run the following command

```bash
  pnpm run test:e2e
```

To run e2e tests with the playwright browser, run the following command

```bash
  pnpm run test:e2e:ui
```
