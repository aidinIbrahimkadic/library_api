const Book = require("../../models/Book");

const getAllBooksController = async (req, res) => {
  try {
    //Vraća iz baze sve knjige
    const books = await Book.findAll();

    if (!books) res.sendStatus(404);
    //Šalje sve knjige u JSON formatu
    res.json(books);
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = getAllBooksController;
