const Task = require("./model");
const Member = require("../member/model");
const jwt = require("jsonwebtoken");

const addNewTask = async (req, res) => {
  try {
    const FamilyId = req.verification.id;
    const result = await Task.create({
      FamilyId: FamilyId,
      taskname: req.body.taskname,
      points: req.body.points,
      MemberId: req.body.MemberId,
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
    const nullTasks = await Task.findAll({
      where: {
        MemberId: null,
        FamilyId: req.verification.id,
      },
    });
    const activeTasks = await Task.findAll({
      where: {
        MemberId: req.params.MemberId,
        FamilyId: req.verification.id,
      },
    });

    res.status(201).json({ message: "success", nullTasks, activeTasks });
    return;

    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const assignMember = async (req, res) => {
  try {
    const result = await Task.update(
      { MemberId: req.body.MemberId || null },
      { where: { id: req.body.taskid } }
    );
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
    res.status(201).json({ message: "Success!", result });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: error.message, error: error });
  }
};

const editTaskDetails = async (req, res) => {
  console.log("SOME LABEL", typeof req.body.points);
  try {
    const result = await Task.update(
      { taskname: req.body.taskname, points: req.body.points },
      { where: { id: req.body.id } }
    );
    console.log("BIGRESULT", result);

    res.status(201).json({ message: "Success!", result });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: error.message, error: error });
  }
};
module.exports = { addNewTask, getAllTasks, assignMember, editTaskDetails };
