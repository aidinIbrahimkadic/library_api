const Book = require("../../models/Book");

const deleteBookController = async (req, res) => {
  try {
    //Pronađi knjigu u bazi na osnovu sluga i izbriši
    const slug = req.params.slug;
    const book = await Book.destroy({
      where: { slug: slug },
    });

    if (!book) res.sendStatus(400);
    res.status(201).send("Uspješno izbrisana knjiga!");
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = deleteBookController;
