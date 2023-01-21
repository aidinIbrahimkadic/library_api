const uuid = require("uuid");
const slugify = require("slugify");
const Book = require("../../models/Book");

const addNewBookController = async (req, res) => {
  try {
    //Provjeri da li je admin upisao naziv knjige
    if (!req.body.name)
      return res
        .status(400)
        .send(
          "You need to provide at least name of the book in order to add new book to the database!"
        );

    //Dodijeli varijablama odgovarajuće vrijednosti
    const { name, author, onStock } = req.body;
    const id = uuid.v4();
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const borrowed = 0;
    const slug = slugify(name, { lower: true, trim: true });

    //Dodaj sve varijable u bazu
    const book = await Book.create({
      id: id,
      name: name,
      slug: slug,
      author: author,
      createdAt: createdAt,
      updatedAt: updatedAt,
      onStock: onStock,
      borrowed: borrowed,
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = addNewBookController;
