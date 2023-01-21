const Book = require("../../models/Book");

const getOneBookController = async (req, res) => {
  try {
    //preuzimanje slug-a is URL
    const slug = req.params.slug;

    //Pronalazak u bazi na osnovu sluga
    const book = await Book.findOne({
      where: {
        slug: slug,
      },
    });

    if (!book) res.sendStatus(404);

    //Slanje traženje knjige u JSON formatu
    res.json(book);
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = getOneBookController;
