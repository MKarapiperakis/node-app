# Developing RESTful Web Services with Node.js and Express
## 1.0.0
Release Date: 25/11/2023

### Welcome! Before you get started, please ensure that you have the following prerequisites installed and configured.

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

## 1.0.1
Release Date: 26/11/2023

### New Features

**Node.js and Google DialogFlow Integration:**
  - This release introduces seamless integration between Node.js and Google DialogFlow. Now, users can leverage the power of Google DialogFlow directly within their Node.js applications, enhancing the conversational capabilities and interactions of their projects.

### Prerequisites
**Google Cloud Platform (GCP) Account:**

1. You will need a GCP account with at least one active project.
2. Create a new service account.

<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/088019c3-a52c-43b9-b1d6-27b20fe80451" alt="Image 1" >
<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/8799d831-45fa-4c96-8196-97f851ba4bca" alt="Image 2"  height="300">
<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/7dc8d2a5-fb27-4f77-8136-bb701e79f306" alt="Image 3"  height="400">
<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/9bb4fc9d-bfdb-49ee-8be0-b6c963ccb853" alt="Image 4"  height="400">
<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/db1249a8-5e5b-49be-9e45-ce4a8f2a1ee6" alt="Image 5"  height="400">

3. Create a new key for the respective service account.

<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/5de30ab5-b2cb-4a18-b007-acac06a34801" alt="Image 5"  width = "500" height="400">
<img src="https://github.com/MKarapiperakis/node-app/assets/80547372/87c50f18-1f9a-4a5c-bafa-411973ea51fb" alt="Image 5"  width = "500" height="350">



4. Extract the created JSON file and replace it with the existing one in the path `src\controllers\dialogFlowKey.json`.

![10](https://github.com/MKarapiperakis/node-app/assets/80547372/67802f56-99d5-4539-aec5-dc3cd8fa0bce)


5. Open the controller located at `src\controllers\dialogFlow.js` and make the necessary changes in line 5 & 9 to reflect the new service account credentials.

### Test your agent using Swagger UI

![1](https://github.com/MKarapiperakis/node-app/assets/80547372/e2f0d6be-30c8-4b80-aab4-e022e7c44555)

![2](https://github.com/MKarapiperakis/node-app/assets/80547372/c741016b-164e-46f7-9c31-dcea218878c4)

## 1.0.2
Release Date: 30/11/2023

### New Features

**Sending custom emails using nodemailer:**
  - In this release, users now have the capability to send customized emails directly from their Gmail accounts using Nodemailer.

### Prerequisites
1. **Gmail app password**: You need to generate a gmail app password from your Google Account:
<img width="1435" alt="Google-account-Security-App passwords-Teamgate-SMTP" src="https://github.com/MKarapiperakis/node-app/assets/80547372/c2d08439-d988-4b44-9916-9834e9f56539">

![google-account-app-password](https://github.com/MKarapiperakis/node-app/assets/80547372/fea5ad69-7bff-4db2-bbb5-929832b191de)

2. **Environment Variables:**
    - Create a new or modify the existing `.env` file in the root of your project.
    - Copy the content from `.env.sample` into `.env`. Three new environment variables have been added:
      1. EMAIL_SENDER
      2. PASSWORD_SENDER
      3. EMAIL_RECEIVER
    - Substitute the initial variable with your Gmail address, the second one with the password generated in the initial step, and choose an email recipient.

### Test your server using Swagger UI
![image](https://github.com/MKarapiperakis/node-app/assets/80547372/ed2bd1fe-12bc-461a-85c8-6dd43829d385)
![image](https://github.com/MKarapiperakis/node-app/assets/80547372/61f43006-cdcb-4ef6-9e36-3b0be705cbbd)

### Check your Emails!
![image](https://github.com/MKarapiperakis/node-app/assets/80547372/77927613-eb2c-4d9d-a030-faa494af80a6)


## 1.0.3
Release Date: 11/12/2023

### New Features

## Adding Basic Authentication for Enhanced Security
With this release, users have the option to implement Basic Authentication to enhance the security of their API requests.

### Prerequisites

1. **Environment Variables:**
    - Create a new or modify the existing `.env` file in the root of your project.
    - Copy the content from `.env.sample` into `.env`. One additional environment variable has been added with name BASIC_AUTH. It is a based 64 encoded value:
    BASIC_AUTH='bm9kZTphcHA=' --> node:app (username:password)
    - Use this username and password in swagger UI


    ![image](https://github.com/MKarapiperakis/node-app/assets/80547372/6fa88316-aef9-4b76-a312-fc2328f00b4b)

 ### Test your server using Swagger UI

 ![image](https://github.com/MKarapiperakis/node-app/assets/80547372/4c4943c0-94f6-41e7-b978-52039ac82c66)



Happy coding!
