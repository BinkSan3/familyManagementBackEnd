const Task = require("./model");
const jwt = require("jsonwebtoken");

const addNewTask = async (req, res) => {
  try {
    const FamilyId = req.verification.id;
    const result = await Task.create({
      FamilyId: FamilyId,
      taskname: req.body.taskname,
      points: req.body.points,
    });

    res.status(201).json({ message: "success", result });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error: error });
    }
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllTasks = async (req, res) => {
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

const assignMember = async (req, res) => {
  try {
    const result = await Task.update(
      { MemberId: req.body.MemberId },
      { where: { id: req.body.taskid } }
    );
    console.log(result);
    const nullTasks = await Task.findAll({
      where: {
        MemberId: null,
      },
    });
    const activeTasks = await Task.findAll({
      where: {
        MemberId: req.body.MemberId,
      },
    });
  } catch (error) {}
};

module.exports = { addNewTask, getAllTasks, assignMember };
