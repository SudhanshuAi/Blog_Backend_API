# Blog Post Backend API

This is a backend API for managing blog posts. It is built using Node.js and Express framework, with MySQL as the database.

## Features

-   User authentication: Sign up and sign in functionalities with JWT token generation and verification.
-   CRUD operations on blog posts: Create, read, update, and delete blog posts.
-   Secure endpoints: JWT token authentication middleware ensures secure access to the API endpoints.

## Prerequisites

Before running this API, ensure you have the following installed:

-   Node.js and npm
-   MySQL server

## Installation

1.  Clone this repository:
    
    bashCopy code
    
    `git clone <repository-url>` 
    
2.  Install dependencies:
    
    bashCopy code
    
    `npm install` 
    
3.  Set up MySQL database:
    
    -   Install MySQL server if not already installed.
        
    -   Start MySQL server if it's not running.
        
    -   Access MySQL shell:
        
        bashCopy code
        
        `mysql -u root -p` 
        
    -   Create a MySQL database named `blogpost`:
        
        sqlCopy code
        
        `CREATE DATABASE IF NOT EXISTS blogpost;` 
        
    -   Create tables by running the SQL queries provided in `index.js`.
        
    -   Update the database configuration in the source code if necessary (`host`, `user`, `password`).
        

## Configuration

You can configure the following settings in the `config.js` file:

-   `JWT_SECRET`: Secret key used for JWT token generation and verification.

## Usage

1.  Start the server:
    
    bashCopy code
    
    `node index.js` 
    
2.  Access the API endpoints using a REST client or integrate with your frontend application.
    

## API Endpoints

-   `POST /api/v1/signup`: User sign up with email and password.
-   `POST /api/v1/signin`: User sign in with email and password.
-   `POST /api/v1/posts`: Create a new blog post (authentication required).
-   `GET /api/v1/posts/:id`: Read a specific blog post.
-   `PUT /api/v1/posts/:id`: Update a specific blog post (authentication required).
-   `DELETE /api/v1/posts/:id`: Delete a specific blog post (authentication required).

## Security

-   JWT token authentication is used to secure the API endpoints.
