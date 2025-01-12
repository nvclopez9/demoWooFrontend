# WooGraphQL Shop Demo - Nova Devs

This repository showcases a step-by-step implementation of a headless e-commerce shop using WooGraphQL, based on the official guide created by [Geoff Taylor](https://twitter.com/kidunot89). The detailed tutorial is available [here](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5).

The project is structured into two main parts:

---

## **Backend**

The backend is a WordPress installation managed with [PHP Composer](https://getcomposer.org/) and configured using [Bedrock](https://roots.io/bedrock/) by [Roots.io](https://roots.io/). It serves as the WordPress backend for the demo application found in the `/frontend` directory. 

For local development, the backend is packaged with Docker. Be sure to follow the instructions provided in the `/backend` directory's `README` file to configure and use the backend correctly.

---

## **Frontend**

The frontend is a demo e-commerce application built with [Next.js](https://nextjs.org/). It features minimal styling and uses `shadcn/ui` for simple UI components. The application contains three pages and is intended as a reference and demonstration of the capabilities of WooGraphQL.

Refer to the `/frontend` directory's `README` file for detailed instructions on setting up and running the frontend.

---

## **Notes**

- Ensure that both the backend and frontend are configured correctly using their respective `.env` files to guarantee proper functionality.
- Follow the [official WooGraphQL tutorial](https://woographql.com/blog/building-headless-shops-with-woographql-chapter-1-of-5) for a deeper understanding of the setup and workings of the project.
- Each section (`/backend` and `/frontend`) includes its own `README` file with detailed usage and configuration instructions.
