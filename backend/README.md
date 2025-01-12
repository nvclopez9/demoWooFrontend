# Bedrock WordPress Backend

This repository contains the backend for the WooGraphQL demo, built using [Bedrock](https://roots.io/bedrock/). Bedrock is a WordPress boilerplate that enhances project organization and simplifies dependency management with Composer.

## Overview

Bedrock offers the following features:

- **Improved folder structure:** Ensures better organization of WordPress projects.
- **Dependency management:** Uses [Composer](https://getcomposer.org/) to manage WordPress core, plugins, and themes.
- **Environment-specific configuration:** Simplifies environment configuration with [Dotenv](https://github.com/vlucas/phpdotenv).
- **Enhanced security:** Includes a separated web root and secure password handling with [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt).
- **Autoloader for `mu-plugins`:** Allows regular plugins to be used as must-use plugins.

## Requirements

To run the backend, you will need:

- PHP 7.4 or higher
- Composer
- Docker (optional, for containerized usage)
- MySQL-compatible database

## Getting Started

Follow these steps to set up the Bedrock backend:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Set up environment variables:**
   Copy the `.env.dist` file to `.env` and configure the required settings, such as database credentials and URLs.
   ```bash
   cp .env.dist .env
   ```

4. **Run the application:**
   - If using Docker:
     ```bash
     docker-compose up
     ```
   - Without Docker:
     - Ensure your local web server is configured to serve from the `web/` directory.
     - Point the web server to the domain defined in `.env.local`.

5. **Access the WordPress admin:**
   Visit the URL specified in your `.env.local` file to complete the WordPress setup.

6. **Follow the official tutorial:**
   This project is part of a step-by-step guide on building headless shops with WooGraphQL. You can find the tutorial [here](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5). The tutorial includes additional details on configuring the project and setting up features like GraphQL.

## Environment Variables

The following environment variables are configured in the `.env.dist` file, and they should be copied and adjusted in `.env.local`:

```env
DB_HOST=db:3306
DB_USER=wordpress
DB_PASSWORD=not-so-secure
DB_NAME=wordpress
WP_HOME=http://localhost:8080
WP_SITEURL="${WP_HOME}/wp"
WP_DEBUG_LOG='debug.log'
WP_ENV='development'

AUTH_KEY=<secure_random_value>
SECURE_AUTH_KEY=<secure_random_value>
LOGGED_IN_KEY=<secure_random_value>
NONCE_KEY=<secure_random_value>
AUTH_SALT=<secure_random_value>
SECURE_AUTH_SALT=<secure_random_value>
LOGGED_IN_SALT=<secure_random_value>
NONCE_SALT=<secure_random_value>
GRAPHQL_JWT_AUTH_SECRET_KEY=<secure_random_value>
```

### Explanation of Key Variables

- **DB_HOST:** Database host and port.
- **DB_USER:** Database username.
- **DB_PASSWORD:** Database password.
- **DB_NAME:** Database name.
- **WP_HOME:** The home URL of the WordPress site.
- **WP_SITEURL:** The WordPress URL, typically includes `/wp`.
- **WP_DEBUG_LOG:** Path to the debug log file.
- **WP_ENV:** The environment type, e.g., `development` or `production`.
- **AUTH_KEY, SECURE_AUTH_KEY, etc.:** Security keys and salts used by WordPress for authentication and secure operations. These should be unique and randomly generated to prevent unauthorized access.
- **NONCE_KEY and NONCE_SALT:** Specific keys used for generating unique nonces, ensuring secure forms and protecting against CSRF (Cross-Site Request Forgery) attacks. You can generate these securely using the [official WordPress key generator](https://api.wordpress.org/secret-key/1.1/salt/).
- **GRAPHQL_JWT_AUTH_SECRET_KEY:** Secret key for GraphQL JWT authentication, required for secure communication between the frontend and backend.

## Features

- **Git integration:** Manage your WordPress files with version control.
- **Composer-managed plugins and themes:** Easily add or update dependencies using Composer.
- **Separation of concerns:** Keeps your WordPress core files separate from custom code.

### Product Generator

This project includes a product generator to help populate the store with sample data for testing and development. Instructions for using the product generator are provided in the official tutorial linked above.

## Learn More

- [Bedrock Documentation](https://roots.io/bedrock/docs/)
- [Twelve-Factor App Methodology](https://roots.io/twelve-factor-wordpress/)

## Community and Support

- Join the discussion on [Roots Discourse](https://discourse.roots.io/).
- Follow [@rootswp on Twitter](https://twitter.com/rootswp) for updates.
- Read the [Roots Blog](https://roots.io/blog/).

## Sponsors

Bedrock is an open-source project and free to use. If you find it helpful, consider [sponsoring Roots](https://github.com/sponsors/roots) to support ongoing development.
