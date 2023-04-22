# Articles service with search engine

This repository contains a web server written in TypeScript using Node.js, Nest.js, MongoDB, Typesense, and containerized with Docker.


## Tech

- [NodeJS](https://nodejs.org/en/) - JavaScript runtime environment.
- [NestJS](https://nestjs.com/) - Web framework for NodeJS.
- [Typescript](https://www.typescriptlang.org/) - Strongly typed programming language.
- [MongoDB](https://www.mongodb.com/) - Document-oriented database.
- [Typesense](https://typesense.org/) - Open source search engine
- [Docker](https://www.docker.com/) - Open source containerization platform.
- [Nginx](https://www.nginx.com/) - Open-source web server, used in this project as API Gateway

## Prerequisites

Before running the server, you need to set some environment variables in the `.env` file at the root of the cloned repository.

- MONGODB_URI - MongoDB connection string
- MONGODB_DB - Name of the database
- TYPESENSE_URI - Typesense connection string
- TYPESENSE_API_KEY - Typesense API key (defined in [docker-compose](docker-compose.yml))
 
## Installation

1. Clone or copy the repository.
2. Navigate to the repository.
3. Run the Docker container.
```sh
docker compose up
```

The server should now be running on the 80 port.

# Usage

This server provides the following endpoints:

* `POST /api/user`: Add a new user.
* `GET /api/user/:id`: Get user by id
* `GET /api/user`: Get all users
* `DELETE /api/user`: Delete user
* `POST /api/article`: Add a new article.
* `GET /api/article/:id`: Get article by id
* `GET /api/article`: Get all article
* `DELETE /api/article`: Delete article
* `POST /api/comment`: Add a new comment.
* `GET /api/comment/:id`: Get comment by id
* `GET /api/comment`: Get all comments
* `DELETE /api/comment`: Delete comment
* `GET api/article/search?text=` : Search all articles for provided text

Additional endpoints:  
* `POST /api/content/restore`: Drop all data and load content from a file
* `POST /api/content/load`: Load content from a file to expand the current values

To use the server, you can send HTTP requests to these endpoints. The repository includes an IntelliJ IDEA [REST configuration file](rest.http) with sample requests that you can use as a reference.

### Misc

Drop database and clear Typesense index
```bash
npm run execute drop-db
```
Load all database records and save stringified
```bash
npm run execute save-db
```

# License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
