const Book = require("../../models/Book");

const borrowBookController = async (req, res) => {
  //Slug iz URL
  const slug = req.params.slug;

  try {
    //Tražimo koliko primjeraka knjige ima na zalihama
    const book = await Book.findOne({
      where: { slug: slug },
      attributes: ["onStock"],
    });

    if (!book) res.sendStatus(404);

    //ako je 0 na zalihama onda poruka customeru
    if (book.dataValues.onStock == 0) {
      return res.send("Tražene knjige nema na stanju!");
    }
    //smanji zalihe za 1
    await Book.decrement("onStock", { by: 1, where: { slug: slug } });
    //povećaj polje naPosudbi (borrowed) za 1
    await Book.increment("borrowed", { by: 1, where: { slug: slug } });
    //ažuriraj updatedAt
    await Book.update({ updatedAt: Date.now() }, { where: { slug: slug } });
    //Poruka korisniku
    res.json(book);
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = borrowBookController;
