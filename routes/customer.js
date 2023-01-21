const router = require("express").Router();

//Posudba knjige

/**
 * @swagger
 * /customer/book/{slug}/borrow:
 *  patch:
 *    summary: Borrow book by slug
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
 *        description: Book successfully borrowed
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      500:
 *        description: Server error
 *      404:
 *        description: Missing book name
 */

router.patch(
  "/book/:slug/borrow",
  require("../controllers/customer/borrowBookController")
);
//Vraćanje sa posudbe

/**
 * @swagger
 * /customer/book/{slug}/return:
 *  patch:
 *    summary: Return book by slug
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
 *        description: Book successfully returned
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Book'
 *      500:
 *        description: Server error
 *      404:
 *        description: Missing book name
 */

router.patch(
  "/book/:slug/return",
  require("../controllers/customer/returnBookController")
);
module.exports = router;
