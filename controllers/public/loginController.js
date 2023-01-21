const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginController = async (req, res) => {
  if (!req.body.email || !req.body.password) return res.sendStatus(400);

  const { email, password } = req.body;
  let user;
  //Pronađi usera u bazi
  try {
    user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.sendStatus(400);
    }
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }

  //Provjera šifre i slanje JSON WEB TOKENA sa podacima email i role radi kasnije autentifikacije
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { email: email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ accessToken: accessToken });
    } else {
      res.send("Invalid password");
    }
  } catch (err) {
    res.status(500).send(err.errors[0].message);
  }
};

module.exports = loginController;
