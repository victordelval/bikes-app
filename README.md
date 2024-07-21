# Bikes Map App

## Planning: Criteria and Priorities

- Simplicity, good practices and minimal dependencies (third-party libraries)
- TDD, with parallel implementation of the development of the application and the basic testing of the components and the application, to guarantee quality, operation and compliance with the specifications by the business.
- Priority has been given to carrying out a first iteration around the initial configuration of the project and the development of the basic functionality, leaving the design and implementation of the components with Shadcn/ui for a later iteration.

## Development environment:

Here the initial configuration, the Tooling and the Testing framework are justified.

### Initial Setup & Tooling

- `npm` is used as the package manager, for simplicity and convenience, although a good alternative would also be `pnpm`.

- Initialization of the Next.js project with `create-next-app`, with all default options (TS, ESLint, Tailwind, `src/app/`)

- Cleaning styles and page in app/ root, initial structure of pages grouped in `app/(networks)`, and Poppins font

- Initial basic setup with Prettier integration, and some sorting plugins for imports and Tailwindcss classes.

### Testing framework

An initial testing framework is implemented using two technologies to cover two types of tests and complement each other.

- On the one hand, vitest with RTL dedicated mainly to more unit tests, both components and functions; although also some integration testing at the page level, although with some limitations with asynchronous ssr pages. `@testing-library/jest-dom` is also added to extend the matchers and `@testing-library/user-event` to simulate the user's interaction with the UI in the tests.
- On the other hand, Playwrigth is used to test the integration at the page and e2e level, testing more complete use cases of user interaction with the application. For simplicity, it is only left configured for the chromium browser type.

The type of components of the asynchronous ssr pages is tested more easily with Playwright, finding a priori some limitations with Vitest and RTL to test the integrations of the cases that represent a rendering after the simulation of the interaction with the user.

Therefore, Vitest and RTL are proposed as a good alternative for testing components and unit functions, and Playwrigth for intergation tests at the page level, and e2e involving several elements on the page or several pages.

Initial difficulties have been found to mock the data in the ssr asynchronous pages, both in Vitest and with Playwright, depending in both cases on the data from the external APIs, something to investigate and improve in future iteration.

## Architecture

About project structure and organization .

Inside `src/` in the project:

- In the `app/` directory, the special Next.js directory for the App router, only the pages and layouts, such as composition of domino components, with glue markup for the layout, and data management at the page level.

- in `components/` React components from the domain point of view. At the moment it is a flat directory, open to future reorganization if the application grows (by features or views, etc., such as "molecules" or "organisms"). Each component is encapsulated in its own directory, ideally with files for the test and style classes. The main module file of the component has been named

- in `lib/ui` the library of reusable "atom" type components, where you could also consider encapsulating a third-party library such as shadcn/ui, or even Tailwindcss to decouple from the highest level components of the business domain of the application.

- in `data/` contains the application's API, both with the functions to interact with the external or file APIs, with their DTOs, and the functions for transforming the DTOs into entities of the application's domain, in /types

## Data management

About capture, transformation and state management.

The two networks pages, the global page and the details page, are components rendered on the server and asynchronous, managing the data request with fetch and its cache optimization in the ssr components.

At the moment the flow of data and states in the application is very simple and more sophisticated client-side mechanisms, such as redux, context providers, or react-query, are not implemented.
