[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# FlowTrack

An project using the [Flowmodoro technique](https://flowtrack.vercel.app/sobre-o-flowmodoro) to ensure better focus and productivity

![Desktop home](https://github.com/brunomestanza/flowmodoro/blob/main/public/screenshots/home-desktop.jpeg?raw=true)

## Features

- Light/dark mode toggle
- Responsiveness
- Time management for an better an rewarded time of focus
- Possibility of choose between two different pause styles
- Explanation of what is Flowmodoro and why you should use it

## Screenshots

![Home mobile](https://github.com/brunomestanza/flowmodoro/blob/main/public/screenshots/home-mobile.jpeg?raw=true)

![About mobile](https://github.com/brunomestanza/flowmodoro/blob/main/public/screenshots/about-mobile.jpeg?raw=true)
## Run Locally

Clone the project

```bash
  git clone https://github.com/brunomestanza/flowmodoro.git
```

Go to the project directory

```bash
  cd flowmodoro
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CI`: If project is on CI, for running tests propose, can be true of false.

`MODE`: The environment mode, can be production, development or test.

See the [.env.test](https://github.com/brunomestanza/flowmodoro/blob/main/.env.test) file to an example, and create an .env.local file to run it locally.

## Running Tests

To run unit tests, run the following command

```bash
  pnpm run test
```

To run e2e tests, run the following command

```bash
  pnpm run test:e2e
```

To run e2e tests with the ui, run the following command

```bash
  pnpm run test:e2e:ui
```

## Tech Stack

React, shadcn-ui, Tailwind, zod, Eslint, Prettier, vite, playwright

## FAQ

#### What it does?

Make possible to have an focus and productive period of work, using the Flowmodoro technique.

#### What is not does?

An focus flow using the Pomodoro technique, an stopwatch or an clock.

## License

[MIT](https://choosealicense.com/licenses/mit/)
