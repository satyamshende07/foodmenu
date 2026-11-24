
# Food Menu API

A RESTful Food Menu Management API built using Spring Boot and MongoDB.

Food Menu API provides endpoints to manage food items, allowing users to retrieve, search, and filter food records. It also supports secure authentication and role-based authorization for managing food data.

The project is designed with a layered architecture and follows REST API development best practices.


## Features

- **Food Management:** Create, retrieve, update, and delete food items.
- **User Authentication:** Secure user registration and login.
- **JWT Authentication:** Token-based authentication for protected APIs.
- **Role-Based Authorization:** Different permissions for USER and ADMIN roles.
- **Food Search:** Search food items by name with case-insensitive matching.
- **Category Filtering:** Retrieve food items based on food categories.
- **Pagination:** Retrieve food records in pages.
- **Sorting:** Sort food items by name and price.
- **Input Validation:** Validate incoming API requests.
- **Global Exception Handling:** Handle API errors with standardized responses.
- **Swagger Documentation:** Explore and test APIs through Swagger UI.
- **Postman Testing:** Automated API tests using Postman Collection Runner.


## Tech Stack

| Technology | Purpose |
|---|---|
| Java 27 | Programming Language |
| Spring Boot 4.1.2 | Backend Framework |
| Spring Security | Authentication and Authorization |
| Spring Data MongoDB | Database Operations |
| MongoDB | NoSQL Database |
| JWT | Token-Based Authentication |
| BCrypt | Password Encryption |
| Maven | Dependency Management |
| Swagger / OpenAPI | API Documentation |
| Postman | API Testing |
| Git & GitHub | Version Control |


## Project Structure

```text
foodmenu/
├── src/
│   ├── main/
│   │   ├── java/com/example/foodmenu/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── exception/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   ├── service/
│   │   │   └── FoodmenuApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── postman/
│   └── Food Menu API.postman_collection.json
├── pom.xml
└── README.md
```


## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |

### Food Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/add-food` | Add a food item | ADMIN |
| GET | `/all-food` | Get all food items | USER, ADMIN |
| PUT | `/update-food/{id}` | Update a food item | ADMIN |
| DELETE | `/delete-food/{id}` | Delete a food item | ADMIN |
| GET | `/search?name=pizza` | Search food by name | USER, ADMIN |
| GET | `/category?category=Italian` | Filter by category | USER, ADMIN |
| GET | `/page?page=0&size=5` | Get paginated food items | USER, ADMIN |


## Security

The application uses Spring Security and JWT for securing REST APIs.

- Users can register and log in using their credentials.
- Passwords are encrypted using BCrypt before storing them in MongoDB.
- Successful login generates a JWT token.
- Protected endpoints require a valid JWT token.
- **USER:** Can view and search food items.
- **ADMIN:** Has permission to add, update, and delete food items.

Include the JWT token in the Authorization header:

```text
Authorization: Bearer <your-jwt-token>
```


## Installation and Setup

### Prerequisites

Make sure you have installed:

- Java 27
- Maven
- MongoDB
- IntelliJ IDEA or any Java IDE

### Steps to Run the Project

**1. Clone the repository**

```bash
git clone https://github.com/satyamshende07/foodmenu.git
```

**2. Navigate to the project directory**

```bash
cd foodmenu
```

**3. Configure MongoDB**

Make sure MongoDB is running locally and configure the database connection in `application.properties`.

```properties
spring.mongodb.uri=mongodb://localhost:27017/foodmenu
server.port=8080
```

**4. Configure environment variables**

Set the required `JWT_SECRET` and configure `ADMIN_USERNAME` and `ADMIN_PASSWORD` for the initial admin account.

Do not commit actual passwords, JWT secrets, or tokens to GitHub.

**5. Run the application**

```bash
mvn spring-boot:run
```

The application will start at:

`http://localhost:8080`


## API Documentation

### Swagger UI

After starting the application, open the following URL to explore and test the REST APIs:

http://localhost:8080/swagger-ui/index.html

Swagger provides interactive API documentation, including request examples, response examples, and authentication support.

### Postman Collection

The project includes a Postman collection for testing API endpoints.

Collection location:

`postman/Food Menu API.postman_collection.json`

To use it:

1. Open Postman.
2. Click Import.
3. Select the JSON collection file.
4. Configure the required environment variables and JWT token.
5. Run individual requests or use Collection Runner to execute automated tests.



## Future Improvements

- Integrate a frontend using React.js.
- Add food images and image upload functionality.
- Implement advanced filtering by price and availability.
- Add user profile management.
- Deploy the application to a cloud platform.

