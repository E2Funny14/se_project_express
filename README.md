# WTWR (What to Wear?): Back End
Project 12 is a back-end server for a weather-based clothing recommendation app. This server provides an API for managing users and clothing items, including functionality for creating, retrieving, updating, and deleting data. It also supports user authentication and authorization.

## Live Application

**Frontend URL**: https://wtwr.example.com.jumpingcrab.com

## Features

**User Management**: Create and retrieve user profiles.
**Clothing Item Management**: Add, retrieve, delete, and like/dislike clothing items.
**Error Handling**: Handling of all errors
**Database Integration**: Persistent data storage using MongoDB.
**RESTful API**: Follows REST principles for API design.
**Security**: JWT-based authentication
**Request Logging**: Winston-based logging for requests and errors
**Input Validation**: Joi and Celebrate validation middleware

## Technologies and Techniques Used

**Node.js** & **Express.js**: Server framework
**MongoDB** & **Mongoose**: Database and ODM
**JWT**: Authentication
**bcrypt**: Password hashing
**validator.js**: Input validation 
**ESLint** & **Prettier**: Code quality
**nodemon**: Development server
**Winston**: Logging
**Celebrate** & **Joi**: Request validation
**PM2**: Process management (production)

## Running the Project

`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
