# Next.js WooGraphQL Frontend

This project is the frontend portion of the WooGraphQL demo, built using [Next.js](https://nextjs.org/). It is a fully functional headless e-commerce application designed to work with a WordPress backend configured in the corresponding repository.

## Getting Started

First, install dependencies and run development server:

```bash

npm install

```
Then:
```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Variables

Environment variables are used to configure the application with dynamic values that can change between development, staging, and production environments. These values are stored in a `.env.local` file to ensure they are kept secure and not hard-coded into the codebase. Examples of such variables include API endpoints, keys, and URLs.

Here is the required `.env.local` configuration for this project:

```env
GRAPHQL_ENDPOINT=http://localhost:8080/wp/graphql
FRONTEND_URL=http://localhost:3000
SITE_NAME='WooGraphQL Demo'
SESSION_TOKEN_LS_KEY='woo-session-token'
REFRESH_TOKEN_LS_KEY='woo-refresh-token'
AUTH_TOKEN_SS_KEY='woo-auth-token'
CLIENT_SESSION_SS_KEY='woo-client-session'
CLIENT_SESSION_EXP_SS_KEY='woo-client-session-exp'
NONCE_KEY=<match_with_backend_nonce_key>
NONCE_SALT=<match_with_backend_nonce_salt>
```

### Explanation of Variables

- **GRAPHQL_ENDPOINT:** The URL of the GraphQL API endpoint used by the frontend to fetch data.
- **FRONTEND_URL:** The base URL of the frontend application.
- **SITE_NAME:** The name of the site, displayed in the UI.
- **SESSION_TOKEN_LS_KEY:** Key used to store the session token in local storage.
- **REFRESH_TOKEN_LS_KEY:** Key used to store the refresh token in local storage.
- **AUTH_TOKEN_SS_KEY:** Key used to store the authentication token in session storage.
- **CLIENT_SESSION_SS_KEY:** Key for client session data stored in session storage.
- **CLIENT_SESSION_EXP_SS_KEY:** Key for storing the client session expiration in session storage.
- **NONCE_KEY and NONCE_SALT:** These keys are critical for CSRF protection and must match the backend values.

A sample file `.env.dist` is included for reference to help you configure your environment variables.

## GraphQL Integration

This project uses `@graphql-codegen/cli` for generating TypeScript types and queries based on the GraphQL schema. The configuration is defined in `codegen.ts`, and environment variables are used to set up the GraphQL endpoint.

### GraphQL Codegen Usage

1. Define the GraphQL endpoint in `.env.local`.
2. Run `npm run codegen:dev` to watch for changes and regenerate types.
3. Queries and mutations are defined in `graphql/` and utilized in the application using `graphql-request`.

## Special Technologies and Tools

This project leverages several modern libraries and tools:

### Framework and Styling

- **[Next.js](https://nextjs.org/):** The React framework for production, providing server-side rendering and static site generation.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for custom design.
- **[shadcn/ui](https://github.com/shadcn/ui):** Pre-built and customizable UI components.

### State Management and Forms

- **[React Hook Form](https://react-hook-form.com/):** Simplified form management.
- **[Zod](https://zod.dev/):** Schema validation for form inputs.

### GraphQL Integration

- **[graphql-request](https://github.com/prisma-labs/graphql-request):** Minimal GraphQL client.
- **[GraphQL Code Generator](https://www.graphql-code-generator.com/):** Automates the generation of TypeScript types and operations.

### Development Tools

- **[Jest](https://jestjs.io/):** For unit testing.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/):** For testing React components.
- **[dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow):** Handles environment variables.

## Scripts

### Development and Build

- `dev`: Runs the development server and GraphQL code generator in watch mode.
- `build`: Builds the production application after generating GraphQL code.
- `start`: Starts the production server.

### Testing

- `test`: Runs tests with coverage.
- `test:watch`: Runs tests in watch mode.

### Code Generation

- `codegen:dev`: Watches for changes and regenerates GraphQL types.
- `codegen:build`: Generates GraphQL types for production.

## Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Define environment variables in `.env.local`. Example variables are provided in `.env.dist`.
3. Start the development server:
   ```bash
   npm run dev
   ```

Check the [Next.js documentation](https://nextjs.org/docs) and the [official WooGraphQL tutorial](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5) for further guidance.
