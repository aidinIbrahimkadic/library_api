const express = require("express");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Simple library API",
      contact: {
        email: "aidin.ibrahimkadic94@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ["./routes/*.js"],
};
const spec = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));
//Preuzimanje podataka iz POST metode
app.use(express.urlencoded({ extended: false }));

//JSON
app.use(express.json());

//Folder za upravljanje routes
app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
