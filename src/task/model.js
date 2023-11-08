const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Task = connection.define("Task", {
  taskname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = Task;
