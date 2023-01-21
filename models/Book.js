const Sequelize = require("sequelize");
const sequelize = require("../config/db");

//Book model
const Book = sequelize.define("Book", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  author: {
    type: Sequelize.STRING,
  },
  onStock: {
    type: Sequelize.INTEGER,
  },
  borrowed: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Book;
