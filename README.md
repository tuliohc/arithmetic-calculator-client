# Arithmetic Calculator

Welcome to the Arithmetic Calculator, a client application built with React, TypeScript, and Material UI. This application interfaces with the [Arithmetic Calculator API](https://github.com/tuliohc/arithmetic-calculator-api) to perform various mathematical operations.

## Features

- Perform basic arithmetic operations: addition, subtraction, multiplication, division, square root.
- Fetch a random string from a [3rd party API](https://www.random.org/).
- User authentication (sign-in) with cookie-based, httpOnly secure authentication.
- All operations have a cost for the user.
- Fetch and reduce user balance according with each operation
- Store and show records of each operation 
- Soft-delete records and show/hide them 
- Datagrid with server pagination, sorting, and filtering.
- Server sign-out cleaning the auth httpOnly secure token

## Project Setup

### Important! Make sure to setup and run the [arithmetic-calculator-api](https://github.com/tuliohc/arithmetic-calculator-api) before setup this project!

1. Clone this repository to your local machine (main branch).

    ```
    git clone git@github.com:tuliohc/arithmetic-calculator-client.git -b main
    ``` 
2. Then, navigate to the project directory and install dependencies

    ```
    cd arithmetic-calculator-client
    npm install
    ```
    
3. Optionally, create a `.env` file at the project root. The content should be:

    ```
    # Make sure you are running the API at http://localhost:3000
    REACT_APP_API_URL=http://localhost:3000/dev/api/v1
    ```

4. Finally, start the project: `PORT=3001 npm start`

    The application will be available at `http://localhost:3001`.


## Project Tests

- Run `npm run test` to run the tests.
- Run `npm run test:coverage` to get the test coverage report.


## Build Project

To create the project build, run this: `npm run build`

## Project Structure

The main folders in the project are within de /src:

- `/api`: Contains all the API interactions.
- `/components`: Contains all the reusable components, and pages, including `Calculator`, `RecordsList`, and `SignIn`.
- `/contexts`: Contains React context for global state management.
- `/hooks`: Contains custom React hooks like useDebounce and useLoading.
- `/routing`: Contains the application's routing configuration.
- `/services`: Contains services used across the application.
- `/utils`: Contains utility functions.

