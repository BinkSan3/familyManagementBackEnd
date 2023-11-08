const Task = require("./model");
const jwt = require("jsonwebtoken");

const addNewTask = async (req, res) => {
  try {
    const result = await Task.create(req.body);

    res.status(201).json({ message: "success", result });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error: error });
    }
    res.status(500).json({ message: error.message, error: error });
  }
};

const getallTasks = async (req, res) => {
  try {
    const result = await Task.findAll();

    if (result.length >= 1) {
      res.status(201).json({ message: "success", result });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addNewTask, getallTasks };
