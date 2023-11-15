const { Router } = require("express");
const taskRouter = Router();

const {
  addNewTask,
  getAllTasks,
  assignMember,
  deleteTask,
  editTaskDetails,
} = require("./controllers");
const { tokenCheck } = require("../middleware/index");


taskRouter.post("/", tokenCheck, addNewTask);

taskRouter.get("/getFamilyTasks/:MemberId", tokenCheck, getAllTasks);

taskRouter.put("/editTask", tokenCheck, editTaskDetails);

taskRouter.put("/assignMember", tokenCheck, assignMember);

taskRouter.delete("/deleteTask", tokenCheck, deleteTask);

module.exports = taskRouter;
