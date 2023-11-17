const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Reward = connection.define("Reward", {
  tier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rewardPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Reward;
