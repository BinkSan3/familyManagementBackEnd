const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Member = connection.define("Member", {
  name: {
    type: DataTypes.STRING,
  },
  totalPoints: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Member;
