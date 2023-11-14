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

//post new tasks
//can we make this so that only a parent can add tasks
taskRouter.post("/", tokenCheck, addNewTask);

// Get all tasks maybe with this one in the frontend only display/render tasks that have a memberId of null
taskRouter.get("/getFamilyTasks/:MemberId", tokenCheck, getAllTasks);

// edit taskname
taskRouter.put("/editTask", tokenCheck, editTaskDetails);

taskRouter.put("/assignMember", tokenCheck, assignMember);

taskRouter.delete("/deleteTask", tokenCheck, deleteTask);

module.exports = taskRouter;
