const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Member = connection.define("Member", {
  name: {
    type: DataTypes.STRING,
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Member;
