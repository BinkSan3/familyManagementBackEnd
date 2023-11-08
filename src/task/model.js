const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Task = connection.define("Task", {
  taskname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Task;
