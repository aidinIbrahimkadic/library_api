const Book = require("../../models/Book");

const returnBookController = async (req, res) => {
  //Slug iz URL
  const slug = req.params.slug;

  try {
    //Tražimo koliko primjeraka knjige je posuđeno
    const book = await Book.findOne({
      where: { slug: slug },
      attributes: ["borrowed"],
    });

    if (!book) res.sendStatus(404);

    //ako su sve knjige na stanju onda poruka customeru
    if (book.dataValues.borrowed == 0) {
      return res.send(
        "Ta knjiga nije naša, po našoj evidenciji sve su na stanju."
      );
    }
    //povećaj količinu zalihe za 1
    await Book.increment("onStock", { by: 1, where: { slug: slug } });
    //umanji količinu posuđeno za 1
    await Book.decrement("borrowed", { by: 1, where: { slug: slug } });
    //ažuriraj updatedAt
    await Book.update({ updatedAt: Date.now() }, { where: { slug: slug } });
    //Poruka korisniku
    res.json(book);
  } catch (err) {
    res.status(500).send("Error: " + err.errors[0].message);
  }
};

module.exports = returnBookController;
