# UCW Example Project

This repo is a demo server as an example of embedding the universal-connect-widget. This repository is used in 
conjunction with the [ucw-app](https://github.com/Universal-Connect-Project/ucw-app) repo, and the 
[universal-connect-widget](https://github.com/Universal-Connect-Project/universal-connect-widget) repo.

## The Three Repos
There are 3 services to start to get a widget demo running locally.

They are:
- https://github.com/Universal-Connect-Project/ucw-example - This repo, which provides a demo UI where the Widget is embedded.
- https://github.com/Universal-Connect-Project/ucw-app - The API Layer.
- https://github.com/Universal-Connect-Project/universal-connect-widget - The Universal Connect Widget UI.

Each of these repositories can be run as a docker container, or from the command-line.

## First, start with this repo, the Example:

## Example Repo

### Set up your config file
Get familiar with [dotenv](https://www.npmjs.com/package/dotenv)
`ucw-app` and this example repo, both use a config file to run. The config files are used to provide sensitive info to
the application. Each config file (`.env`) is not saved to the repo, thus preventing sensitive information from being
pushed into the repo.

So, to begin, create your config file in the root of the project:

```
cp ./.env.example ./.env
```

### To run the example project:
You can use docker, or run the code from the command-line directly.

#### Option 1: 
Build and run the docker image.

```
./build.sh
./start-docker.sh
```
*In your `.env` file, make sure values are encloses by quotes `"` or `'`, this is a limitation of docker*

#### Option 2: 
Run the code directly from the command-line:

```
npm ci
```
Followed by: 
```
npm run start
```
to start the example app

## SECOND: The other two repos

Each of these repos contains a README that outlines how to run the code. Please refer to their respective readmes to 
continue with the set process for each repo.

### The Universal Connect App
This project represents the underlying App/Wrapper, and setup instructions can be found here: 
[ucw-app README](https://github.com/Universal-Connect-Project/ucw-apphttps://github.com/Universal-Connect-Project/ucw-app/blob/main/README.md)

### The Universal Connect Widget
This project represents the UI of the Universal Connect Widget, and setup instructions can be found here:
[universal-connect-widget SETUP README](https://github.com/Universal-Connect-Project/universal-connect-widget/blob/main/SETUP.md)

*Please remember that secrets are passed through environment variables instead of hardcoded in the js file.*
DO NOT put any credentials in any of the js files. If you do so, it could accidentally get committed and leaked to the public.

*UCP credentials are required for authentication and secret exchange, storage (redis-like session cache) and analytics services.*

*The `CryptoKey` and `CryptoIv` values are for encrypting the session token in order to not rely on cookies. They must be shared across server instances if there are multiple instances.*

## FINALLY
Once you have all three repos running:
- Browse `http://localhost:8088/loader.html?env=http://localhost:8080`

A hosted example can be found [here](https://demo.universalconnectproject.org/loader.html?env=https://widget.universalconnectproject.org)

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
