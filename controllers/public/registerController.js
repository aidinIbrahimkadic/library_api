const bcrypt = require("bcrypt");
const uuid = require("uuid");
const User = require("../../models/User");

const registerController = async (req, res) => {
  //Provjera da li je user poslao sve potrebne podatke: email, password i role
  if (!req.body.email || !req.body.password || !req.body.role) {
    return res
      .status(400)
      .send(
        "You need to provide at least email, password and role in order to add new user to the database!"
      );
  }

  try {
    //Definisanje svih varijabli koje trebaju bazi na osnovu dobijenih podataka
    const { username, password, email, role } = req.body;
    const userId = uuid.v4();
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const hashedPassword = await bcrypt.hash(password, 10);

    //Kreiranje novog korisnika
    const user = await User.create({
      id: userId,
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: createdAt,
      updatedAt: updatedAt,
      role: role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err.errors[0].message);
  }
};

module.exports = registerController;
