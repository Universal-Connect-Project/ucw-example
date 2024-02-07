# UCW Example Project

This repo is a demo server as an example of embedding the universal-connect-widget. This repository is used in 
conjunction with the [ucw-app](https://github.com/Universal-Connect-Project/ucw-app) repo, and the 
[universal-connect-widget](https://github.com/Universal-Connect-Project/universal-connect-widget) repo.

Each of these repositories can be run as a docker container, or from the command-line.

## Set up your config file
Get familiar with [dotenv](https://www.npmjs.com/package/dotenv)
`ucw-app` and his example repo, both use a config file to run. The config files are used to provide sensitive info to 
the application. Each config file (`.env`) is not saved to the repo, thus preventing sensitive information from being
pushed into the repo.

So, to begin, create your config file in the root of the project:

```
cp ./.env.example ./.env
```

## SECOND: The other two repos

### The API Server
This project represents the API layer, and can be found here: [ucw-app](https://github.com/Universal-Connect-Project/ucw-app). Once you have cloned the repo, do the following to get it running:
1. Run `npm run keys` in the root folder to generate a new set of `key` and `IV` values.
2. Fill in the `CryptoKey` and `CryptoIv` in your newly created `.env` file with the generated `key` and `IV`.
3. Sign up a UCP client account: [here](https://login.universalconnectproject.org/) (the `Click here to login` link navigates to the aws hosted login page where sign up option is available).
4. Generate and view your client secrets once registered and logged in
5. Fill in the `UcpAuthClientId`, `UcpAuthClientSecret` and `UcpAuthEncryptionKey` in the `.env` file with the values provided by login page.
6. Start the API server by running `npm run server` in the root folder. At this stage, the API server is running and the widget is available at `http://localhost:8080`.

*Please remember that secrets are passed through environment variables instead of hardcoded in the js file.*
DO NOT put any credentials in any of the js files. If you do so, it could accidentally get committed and leaked to the public.

Use the `.env` file.

*UCP credentials are required for authentication and secret exchange, storage (redis-like session cache) and analytics services.*

*The `CryptoKey` and `CryptoIv` values are for encrypting the session token in order to not rely on cookies. They must be shared across server instances if there are multiple instances.*

### The Widget
This project represents the Universal Connect Widget. The repo can be found here: [universal-connect-widget](https://github.com/Universal-Connect-Project/universal-connect-widget). 
Once you have cloned this repo,
1. Run `npm ci` in the root.
2. Then, start the dev server by running `npm run dev`. This will serve the client side code (browser) through port `3000`. 
You can also opt to run this as a docker container, which will also serve the widget at port `3000`. See the repo README for more info.

# Example Repo
## Try with the example website
- Provide the required credentials in [.env](.env).

  *NOTE: please use environment variables to provide the api secrets variable names are the keys in the `config.js`*

### To run the example project:

#### FIRST: Build the app. 

You can use docker, or run the code from the command-line directly.

Option 1: Build and run the docker image.

```
./build.sh
./start-docker.sh
```

Or, run directly from the command-line:

- `npm ci` and `npm run start` to start the example app

#### THEN
- Browse `http://localhost:8088/loader.html?env=http://localhost:8080`
- A hosted example can be found [here](https://demo.universalconnectproject.org/loader.html?env=https://widget.universalconnectproject.org)

## Deeper dive on widget usage

This example demonstrates a client website that embeds the universal widget and retrieves data after a connection has been established through the widget.
1. The `initWidget` function in [src/public/loader.html](src/public/loader.html) shows how a universal widget can be embedded into a webpage.

   The `action` parameter specifies which type of job to run when user creates a connection through the widget:
    - `agg`: aggregation job that returns accounts and transactions under each account;
    - `auth`: auth job that returns payment information including ACH account number and routing number for each account;
    - `identify`: identify job that returns owner's name, address and other identity information for the connection.
2. The [src/providers](src/providers) folder shows how to query each provider for data after a connection has been established through the widget.
    * The example code can be used as-is to query data in verifiable credential format from each provider.
3. Event data are sent out to the client side from the moment user opens the widget, throughout the connection process, until the connection completes.
- load
  ```
    {
      user_guid: string
      session_guid: string
    }
  ```
- loaded
  ```
    {
      user_guid: string
      session_guid: string
      initial_step: string
    }
  ```
- institutionSearch
  ```
    {
      user_guid: string
      session_guid: string
      query: string
    }
  ```
- selectedInstitution
  ```
    {
      user_guid: string
      session_guid: string
      guid: string
      url: string
      name: string
    }
  ```
- stepChange
  ```
    {
      user_guid: string
      session_guid: string
      current: string
      previous: string
    }
  ```
- enterCredentials
  ```
    {
      user_guid: string
      session_guid: string
      institution: {
        guid: string
      }
    }
  ```
- memberStatusUpdate
  ```
    {
      user_guid: string
      session_guid: string
      member_guid: string
      connection_status: number
    }
  ```
- submitMFA
  ```
    {
      user_guid: string
      session_guid: string
      member_guid: string
    }
  ```
- memberConnected
  ```
    {
      user_guid: string
      session_guid: string
      member_guid: string
      provider: string
    }
  ```
- memberError
  ```
    {
      user_guid: string
      session_guid: string
      member: {
        guid: string
        connection_status: number
      }
    }
  ```
