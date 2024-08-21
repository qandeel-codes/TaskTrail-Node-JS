
# TaskTrail API

Welcome to the TaskTrail API repository! This is a RESTful API built using Node.js and Express.js, designed to manage tasks and track progress efficiently. The API leverages SQLite as its database and Sequelize as the ORM for interacting with the database. It also incorporates passport.js for handling authentication.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication by verifying email and password credentials
- Create, read, update, and delete tasks lists
- Create, read, update, delete, and mark as completed tasks within lists
- Lightweight SQLite database
- Using ORM for interacting with the database
- Logging HTTP requests and differentiating the errors in separate log files
- Customized simple logger

## Technologies

- [**Node.js**](https://nodejs.org/en): JavaScript runtime for server-side development.
- [**Express.js**](https://expressjs.com/): Web framework for building the API.
- [**express-validator**](https://express-validator.github.io/docs): Middleware for validating API request parameters and bodies.
- [**SQLite**](https://www.sqlite.org/): Lightweight SQL database for storing data.
- [**connect-sqlite3**](https://github.com/rawberg/connect-sqlite3#readme): SQLite3 session store.
- [**Sequelize**](https://sequelize.org/): ORM for managing database models and interactions.
- [**Passport.js**](https://www.passportjs.org/): Express-compatible authentication middleware.
- [**passport-local**](https://www.passportjs.org/packages/passport-local/): Passport strategy for authenticating with a username and password.
- [**node.bcrypt.js**](https://github.com/kelektiv/node.bcrypt.js#readme): Library to hash passwords.
- [**winston**](https://github.com/winstonjs/winston#readme): Simple and cutomizable logger.
- [**morgan**](https://github.com/expressjs/morgan#readme): HTTP request logger middleware for Node.js.

## Installation

To get started with the TaskTrail API, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/qandeel-codes/TaskTrail-Node-JS.git
   cd TaskTrail-Node-JS

2. **Install dependencies:**

	 ```bash
	npm install

3. **Configure the database:**
  The API uses SQLite, which does not require separate installation but requires a environment variables `.env` file. Ensure to check [Configuration](#configuration) section to build your own.

4. **Install dependencies:**

	  ```bash
	  npm run start:dev
The API should now be running on `http://localhost:3000`.

## Usage

To interact with the TaskTrail API, you can use tools like Postman or curl to send HTTP requests to the endpoints described below. Make sure to  authenticate the user to consume endpoints that requires authentication.

## API Endpoints

Here are some of the primary endpoints available:

-   **Authentication**
    -  `POST /api/auth/register` - Register new user
    -	`POST /api/auth` - Login using user email and password credentials
    -	`GET  /api/auth/status` - Get current authentication status
    -	`POST /api/auth/logout` - User logout

-   **Task Lists**
    -   `GET /api/task-lists` - List all task lists for the logged-in user  (requires authentication)
    -   `GET /api/task-lists/:id` - Retrieve a task list by ID for the logged-in user  (requires authentication)
    -   `POST /api/task-lists` - Create a new task list (requires authentication)
    -   `PUT /api/task-lists/:id` - Update a task list by ID (requires authentication)
    -   `PATCH /api/task-lists/:id` - Partially update a task list by ID (requires authentication)
    -   `DELETE /api/task-lists/:id` - Delete a task list by ID (requires authentication)

-   **Tasks**
    -   `GET /api/task-lists/:listId/tasks` - List all tasks of a certain list for the logged-in user (requires authentication)
    -   `GET /api/task-lists/:listId/tasks/:id` - Retrieve a task by ID for the logged-in user  (requires authentication)
    -   `POST /api/task-lists/:listId/tasks` - Create a new task in a certain list (requires authentication)
    -   `PUT /api/task-lists/:listId/tasks/:id` - Update a task by ID (requires authentication)
    -   `PATCH /api/task-lists/:listId/tasks/:id` - Partially update a task by ID (requires authentication)
    -  `POST /api/task-lists/:listId/tasks/:id/complete` - Mark a task by ID as completed (requires authentication)
    -   `DELETE /api/task-lists/:listId/tasks/:id` - Delete a task by ID (requires authentication)

## Configuration

The API configuration settings must be stored into environment variable using `.env` file. You have to add this file to your solution directory *(this file is git untracked)*, I have added an example file `.env.example` which explain the required options that are used in the API. You can build your file according you preferred settings such as database connection details and server port.

## Testing

Unfortunately, the tests are not developed yet, they are supposed to be done using Jest library.

## Contributing

Contributions to the TaskTrail API are welcome! To contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Commit your changes (`git commit -am 'Add new feature'`).
4.  Push to the branch (`git push origin feature-branch`).
5.  Create a new Pull Request.

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
