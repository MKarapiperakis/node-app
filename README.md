# Developing RESTful Web Services with Node.js and Express

Welcome! Before you get started, please ensure that you have the following prerequisites installed and configured.

## Prerequisites

1. **Node.js:** This project is developed and tested with Node.js version 10.18.1. It is recommended to use this specific version for compatibility. The express-openapi-validate plugin has some issues in the latest node module, so the swagger API will throw an error in the most recent version of node.
  Find more information [here](https://stackoverflow.com/questions/66420890/open-api-error-request-should-have-required-property-headers-docker)


    ```bash
    # Install Node.js 10.18.1 using your preferred version manager (e.g., nvm or npm)
    nvm install 10.18.1
    ```

3. **Server:** Ensure that a server is set up and running. This app relies on a server to function correctly.

4. **Environment Variables:**
    - Create a new `.env` file in the root of your project.
    - Copy the content from `.env.sample` into `.env`.

## Getting Started

To initialize the project, follow these steps:

1. Install project dependencies:

    ```bash
    npm install
    ```

2. Start the application:

    ```bash
    npm start
    ```

Your Node.js app should now be up and running!

## Additional Information

- Feel free to customize the `.env` file to match your specific configuration needs.
- For any issues or questions, please check the [issue tracker](link-to-issues) or open a new issue.
- API Documentation is available in the path **http://localhost:8082/data/api/doc/**
![image](https://github.com/MKarapiperakis/node-app/assets/80547372/b57e9183-fb4c-4212-b6f2-f7c846216776)
- Metrics are available in the path **http://localhost:8082/status**
![image](https://github.com/MKarapiperakis/node-app/assets/80547372/06dbbde6-8691-48ff-80fa-441384ad6f15)





Happy coding!
