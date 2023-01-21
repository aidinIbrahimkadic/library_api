const router = require("express").Router();
const authenticateCustomer = require("../middlewares/authenticateCustomer");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: string
 *          description: Auto generated ID of the user
 *        username:
 *          type: string
 *          description: User's username
 *        email:
 *          type: string
 *          description: User's email
 *        password:
 *          type: string
 *          description: User's password
 *        role:
 *          type: string
 *          description: user role (admin/customer)
 *          enum: [admin, customer]
 *        createdAt:
 *          type: date
 *          description: Date when user was created
 *        updatedAt:
 *          type: date
 *          description: Date when user was updated
 *      example:
 *        id: 0e69f412-3cd4-4580-94fc-17cfd8c3ac18
 *        username: aidin
 *        email: aidin@gmail.com
 *        password: 12345
 *        createdAt: 2023-01-19
 *        updatedAt: 2023-01-20
 *        role: admin
 *    Book:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: Auto generated ID of the book
 *        name:
 *          type: string
 *          description: The book title
 *        slug:
 *          type: string
 *          description: Slug generated from books name, serves for user friendly URL searches
 *        author:
 *          type: string
 *          description: The book author
 *        onStock:
 *          type: integer
 *          description: Number of books available for rent
 *        borrowed:
 *          type: integer
 *          description: Number of books borrowed. Initial value is 0
 *        createdAt:
 *          type: date
 *          description: Date when book was created
 *        updatedAt:
 *          type: date
 *          description: Date when book was updated
 *      example:
 *        id: 0e69f412-3cd4-4580-94fc-17cfd8c3ac18
 *        name: Ime ruže
 *        slug: ime-ruze
 *        author: Umberto Eko
 *        onStock: 20
 *        borrowed: 0
 *        createdAt: 2023-01-19
 *        updatedAt: 2023-01-20
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      name: authorization
 *      in: header
 *      bearerFormat: JWT
 *      scheme: bearer
 */

/**
 * @swagger
 * tags:
 *  - name: Books
 *    description: The books managing API
 *  - name: Users
 *    description: The users managing API
 */

/**
 * @swagger
 * /books:
 *  get:
 *    summary: Returns the list of all books in the database
 *    tags: [Books]
 *    responses:
 *      200:
 *        description: The list of all books
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 */

router.get("/books", require("../controllers/public/getAllBooksController"));

/**
 * @swagger
 * /books/{slug}:
 *  get:
 *    summary: Returns one book by slug
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *        description: The book slug
 *    responses:
 *      200:
 *        description: The book description by slug
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Server error
 */

router.get(
  "/books/:slug",
  require("../controllers/public/getOneBookController")
);

/**
 * @swagger
 * /register:
 *  post:
 *    summary: User registration
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: User's name
 *                required: true
 *              email:
 *                type: string
 *                description: User's email
 *              password:
 *                type: string
 *                description: User's password
 *              role:
 *                type: string
 *                description: User's role
 *                enum: [admin, customer]
 *    responses:
 *      201:
 *        description: User was successfully created
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/User'
 *      500:
 *        description: Server error
 */

router.post("/register", require("../controllers/public/registerController"));

/**
 * @swagger
 * /login:
 *  post:
 *    summary: User login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: user email
 *                required: true
 *              password:
 *                type: string
 *                description: user password
 *                required: true
 *    responses:
 *      200:
 *        description: User is successfully logged in. Copy Json Web Token for access to special routes
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Data invalid or missing
 *      500:
 *        description: Server error
 */

router.post("/login", require("../controllers/public/loginController"));

//ADMIN routes
router.use("/admin", authenticateAdmin, require("./admin"));

//CUSTOMER routes
router.use("/customer", authenticateCustomer, require("./customer"));

module.exports = router;
