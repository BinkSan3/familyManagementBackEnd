const { Router } = require("express");
const taskRouter = Router();

const { addNewTask, getallTasks } = require("./controllers");

//post new tasks
//can we make this so that only a parent can add tasks
taskRouter.post("/", addNewTask);

// Get all tasks maybe with this one in the frontend only display/render tasks that have a memberId of null
taskRouter.get("/", getallTasks);

// edit taskname
taskRouter.put("/editTask");

module.exports = taskRouter;
