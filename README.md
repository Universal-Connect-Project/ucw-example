# UCW Example Project

This repo is a demo server as an example of embedding the universal-connect-widget.

## Try with the example website
- Provide the required credentials in [src/config.js](src/config.js).
  `NOTE: please use envrionment variables to provide the api secrets` variable names are the keys in the `config.js`

### To run the example project:

#### FIRST: Get familiar with [dotenv](https://www.npmjs.com/package/dotenv)
- Create your config file in the root of the project

```cp ./.env.example ./.env```

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
