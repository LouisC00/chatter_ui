# GraphQL Chat App

Welcome to my GraphQL chat application, a real-time messaging web application built with modern web technologies. This project demonstrates my skills as a full-stack developer, focusing on creating a secure and scalable chat application.

## Features

- **Real-Time Messaging**: Instant messaging with GraphQL subscriptions.
- **Backend**: NestJS with a GraphQL API for handling CRUD operations and real-time communication.
- **Distributed Messaging**: Redis integration for handling a large number of concurrent users and messages.
- **Data Persistence**: MongoDB for efficient storage of chat data and user information.
- **Frontend**: React with Material UI for a responsive and visually appealing user interface.
- **State Management**: Apollo Client for interacting with the GraphQL API and caching data.
- **User Profile**: Ability to update user icons, stored securely on Amazon S3.
- **Deployment**: Deployed on AWS Elastic Beanstalk and Amplify with HTTPS configuration for security.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

- git clone https://github.com/LouisC00/chatter_ui.git
- cd chatter_ui

## Running the Application

To run the application in development mode, use the following commands:

## Start the frontend application

- cd chatter-ui
- yarn install
- yarn start

## Environment Variables

Create a `.env` file in the root of the frontend directory and add the following variables:

- `REACT_APP_API_URL`: The URL of the backend API (e.g., `http://localhost:5000`).
- `REACT_APP_WS_URL`: The URL for the WebSocket connection (e.g., `ws://localhost:5000`).

Example `/sample.env`:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- **Louis** - Full-stack developer specializing in modern web technologies.

## Contact

For more details or to discuss potential opportunities, please feel free to reach out.

Thank you for exploring my GraphQL chat application. I'm excited to bring these skills to future projects and continue exploring the possibilities of modern web development.
```
