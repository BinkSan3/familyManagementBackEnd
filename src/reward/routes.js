const { Router } = require("express");
const rewardRouter = Router();

const {
  addNewReward,
  getRewards,
  editReward,
  deleteReward,
} = require("./controllers");
const { tokenCheck } = require("../middleware/index");

rewardRouter.post("/", tokenCheck, addNewReward);

rewardRouter.get("/", tokenCheck, getRewards);

rewardRouter.put("/", tokenCheck, editReward);

rewardRouter.delete("/", tokenCheck, deleteReward);

module.exports = rewardRouter;
