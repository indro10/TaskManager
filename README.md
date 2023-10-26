# Task Manager App

Welcome to the Task Manager App repository! This task manager app is designed to help you stay organized and keep track of your tasks and to-do lists. Whether you're a developer looking to contribute or a user looking to enhance your productivity, you've come to the right place.

# Repository Info

This respository contains both the frontend and backend code (app.taskmanager.frontend / app.taskmanager.backend ) like a monorepo. The project is live on https://task-manager-frontend-dbcy.onrender.com/ deployed using render.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete tasks.
- Mark tasks as completed.
- User-friendly and responsive interface.
- Built using React and Express.

## Getting Started

Follow these instructions to set up the Task Manager App on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [npm](https://www.npmjs.com/) (Node Package Manager) or [Yarn](https://yarnpkg.com/) for managing dependencies.

### Installation

1.  Clone this repository to your local machine:

    ```bash
    git clone https://github.com/indro10/TaskManager.git
    ```

2.  Navigate to the project directory:

    frontend

        ```bash
        cd app.taskmanager.frontend
        ```

    backend

        ```bash
        cd app.taskmanager.backend
        ```

3.  Install the required dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4.  Configure the environment variables. Use the `.env` file in the project root and add the necessary variables, such as database connection details, API keys, or any other sensitive information.

5.  Start the development server:

frontend

```bash
npm start
# or
yarn start
```

backend

```bash
node index.js

```

The app will be running on `http://localhost:3000`.

## Usage

1. Register an account or log in if you already have one.
2. Create new tasks by clicking the "Add Task" button.
3. Edit, delete, and mark tasks as completed by selecting the task.

## Contributing

We welcome contributions from the open-source community. To contribute to this project, follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name:

   ```bash
   git checkout -b feature/my-feature
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your changes to your fork on GitHub:

   ```bash
   git push origin feature/my-feature
   ```

5. Open a pull request to the `main` branch of this repository with a clear description of the changes you made.

Please follow our [Contribution Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
