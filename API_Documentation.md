## API Documentation

## Base URL` 

http://localhost:3000


## Authentication
- Authentication for certain endpoints is done via JWT tokens.
- Include the JWT token in the `Authorization` header as `Bearer <token>` for authenticated endpoints.

## Endpoints

### User Signup
- **URL:** `/api/v1/signup`
- **Method:** `POST`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }

-   **Response:**
    
    
    `{
      "token": "<JWT token>"
    }` 
    

### User Signin

-   **URL:** `/api/v1/signin`
-   **Method:** `POST`
-   **Description:** Authenticates existing user.
-   **Request Body:**
    
    
    `{
      "email": "example@example.com",
      "password": "password123"
    }` 
    
-   **Response:**
    
    
    `{
      "token": "<JWT token>"
    }` 
    

### Create Post

-   **URL:** `/api/v1/posts`
-   **Method:** `POST`
-   **Description:** Creates a new blog post.
-   **Request Body:**
    
    
    `{
      "title": "Title of the post",
      "description": "Description of the post"
    }` 
    
-   **Response:**
    
    
    `{
      "message": "Post created successfully"
    }` 
    

### Read Post

-   **URL:** `/api/v1/posts/:id`
-   **Method:** `GET`
-   **Description:** Retrieves a specific blog post by its ID.
-   **Response:**
    
    
    `{
      "post": {
        "id": 1,
        "title": "Title of the post",
        "description": "Description of the post"
      }
    }` 
    

### Update Post

-   **URL:** `/api/v1/posts/:id`
-   **Method:** `PUT`
-   **Description:** Updates an existing blog post by its ID.
-   **Request Body:**
    
    
    `{
      "title": "Updated title",
      "description": "Updated description"
    }` 
    
-   **Response:**
    
    
    `{
      "message": "Post updated successfully"
    }` 
    

### Delete Post

-   **URL:** `/api/v1/posts/:id`
-   **Method:** `DELETE`
-   **Description:** Deletes a blog post by its ID.
-   **Response:**
    
    
    `{
      "message": "Post deleted successfully"
    }`
