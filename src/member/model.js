const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Member = connection.define("Member", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPoints: {
    type: DataTypes.NUMBER,
    unique: true,
    allowNull: true,
  },
});

module.exports = Member;
