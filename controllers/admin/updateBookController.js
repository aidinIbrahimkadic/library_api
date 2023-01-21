const slugify = require("slugify");
const Book = require("../../models/Book");

const updateBookController = async (req, res) => {
  const slug = req.params.slug;

  //Provjeri da li je user poslao barem jedan podatak za izmjenu: name, author, onStock
  if (!req.body.name && !req.body.author && !req.body.onStock)
    return res
      .status(400)
      .send(
        "You need to provide at least one new parametar in order to update the book!"
      );

  //Dodijeli podatke varijablama
  const { name, author, onStock } = req.body;
  const updatedAt = Date.now();

  //Ako je promijenjeno ime knjige, potrebno generisati novi slug
  let newSlug;
  if (name) {
    newSlug = slugify(name, { lower: true, trim: true });
  }

  //Update knjige na mjestima na kojima imamo truthy varijable
  try {
    await Book.update(
      {
        //I've used: -- name: name && name -- but it didn't work in Swagger
        name:
          name == ""
            ? (
                await Book.findOne({ where: { slug: slug } })
              ).dataValues.name
            : name,
        author:
          author == ""
            ? (
                await Book.findOne({ where: { slug: slug } })
              ).dataValues.author
            : author,
        onStock:
          onStock == ""
            ? (
                await Book.findOne({ where: { slug: slug } })
              ).dataValues.onStock
            : onStock,
        updatedAt: updatedAt,
        slug:
          name == ""
            ? (
                await Book.findOne({ where: { slug: slug } })
              ).dataValues.slug
            : newSlug,
      },
      {
        where: {
          slug: slug,
        },
      }
    );
    res.status(200).send("Uspješno izmjenjen sadržaj knjige");
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = updateBookController;
