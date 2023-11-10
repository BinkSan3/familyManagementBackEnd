const { Router } = require("express");
const taskRouter = Router();

const { addNewTask, getAllTasks, assignMember } = require("./controllers");
const { tokenCheck } = require("../middleware/index");

//post new tasks
//can we make this so that only a parent can add tasks
taskRouter.post("/", tokenCheck, addNewTask);

// Get all tasks maybe with this one in the frontend only display/render tasks that have a memberId of null
taskRouter.get("/getFamilyTasks", tokenCheck, getAllTasks);

taskRouter.put("/assignMember", tokenCheck, assignMember);

// edit taskname
taskRouter.put("/editTask");

module.exports = taskRouter;
