const router = require("express").Router();

/**
 * @swagger
 * /admin/book:
 *  post:
 *    summary: Create new book
 *    security:
 *      - bearerAuth: []
 *    tags: [Books]
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Book title
 *                required: true
 *              author:
 *                type: string
 *                description: Author's name
 *              onStock:
 *                type: integer
 *                description: Number of books available for rent
 *    responses:
 *      201:
 *        description: User was successfully created
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      500:
 *        description: Server error
 *      400:
 *        description: Missing book name
 */

router.post("/book", require("../controllers/admin/addNewBookController"));

/**
 * @swagger
 * /admin/book/{slug}:
 *  delete:
 *    summary: Delete book by slug
 *    security:
 *      - bearerAuth: []
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *        description: The book slug
 *    responses:
 *      201:
 *        description: Book successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      500:
 *        description: Server error
 *      400:
 *        description: Missing book name
 */

router.delete(
  "/book/:slug",
  require("../controllers/admin/deleteBookController")
);

/**
 * @swagger
 * /admin/book/{slug}:
 *  patch:
 *    summary: Update book by slug
 *    security:
 *      - bearerAuth: []
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *        required: true
 *        description: The book slug
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Book title
 *                required: true
 *              author:
 *                type: string
 *                description: Author's name
 *              onStock:
 *                type: integer
 *                description: Number of books available for rent
 *    responses:
 *      201:
 *        description: Book successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      500:
 *        description: Server error
 *      400:
 *        description: Missing book name
 */

router.patch(
  "/book/:slug",
  require("../controllers/admin/updateBookController")
);

module.exports = router;
