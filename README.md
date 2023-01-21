
# REST API library application
Docker repository: 
docker pull kadija/repository

This is a simple library application providing a REST
API. 
App uses mysql database. It contains of two tables:
 - users (id VARCHAR, username VARCHAR, email VARCHAR, password VARCHAR, role VARCHAR (admin/customer), createdAt DATE, updatedAt DATE)
 - books (id VARCHAR, name VARCHAR, slug VARCHAR (automatically generated), author VARCHAR, onStock INT, borrowed INT, createdAt DATE, updatedAt DATE)
 
 Database credentials should be set in .env file, and it should be automatically created with sequelize.sync() method in db.js

All APIs are documented in Swagger: https://localhost/3000/api-docs

## Install dependencies

    npm install bcrypt dotenv express jsonwebtoken mysql2 sequelize slugify swagger-jsdoc swagger-ui-express uuid

## Run the app

    npm start
    nodemon server.js
