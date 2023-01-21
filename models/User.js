const Sequelize = require("sequelize");
const sequelize = require("../config/db");

//User model
const User = sequelize.define("User", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  role: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
