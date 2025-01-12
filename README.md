# WooGraphQL Shop Demo Nova Devs

This repository is a step-by-step project built following the official WooGraphQL guide created by [Geoff Taylor](https://twitter.com/kidunot89). The tutorial can be found [here](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5).

The project is divided into two parts:

## Backend

The backend is a WordPress installation managed using [PHP Composer](https://getcomposer.org/) and configured with [Bedrock](https://roots.io/bedrock/) by [Roots.io](https://roots.io/). It is designed to serve as the WordPress backend for the demo application in `/frontend`. The backend is packaged with Docker for local usage.

### Configuration and Setup

Before running the backend, you need to configure the environment variables. These variables are defined in the `.env` file. A sample configuration file `.env.dist` is provided for reference.

#### Steps:
1. Define the necessary environment variables in `.env`.
2. Run `composer install` to install PHP dependencies.
3. Start the Docker containers with `docker-compose up`.
4. Additional configurations may be required as per the [official tutorial](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5).

## Frontend

The frontend is a demo e-commerce application built with [Next.js](https://nextjs.org/). Styling is kept minimal, and the application uses `shadcn/ui` for some simple components. The frontend contains three pages and is meant for demonstration and reference purposes.

### Configuration and Setup

Before running the frontend, you need to configure the environment variables. Similar to the backend, these variables should be defined in a `.env` file. A `.env.dist` file is provided for guidance.

#### Steps:
1. Define the necessary environment variables in `.env`.
2. Install the required Node.js dependencies with `npm install`.
3. Run the application using `npm run dev`.

## Notes

- Ensure that both the backend and frontend are configured correctly with their respective `.env` files for proper functionality.
- Follow the [official WooGraphQL tutorial](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5) to understand the detailed setup and workings of the project.
