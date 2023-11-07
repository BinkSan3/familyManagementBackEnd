const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Member = connection.define("Member", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  totalPoints: {
    type: DataTypes.NUMBER,
    unique: true,
    allowNull: true,
  },
});

module.exports = Member;
