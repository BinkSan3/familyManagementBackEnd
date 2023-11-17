require("dotenv").config();
const express = require("express");
require("./db/connection");
const cors = require("cors");

const Family = require("./family/model");
const familyRouter = require("./family/routes");

const Member = require("./member/model");
const memberRouter = require("./member/routes");

const Task = require("./task/model");
const taskRouter = require("./task/routes");

const Reward = require("./reward/model");
const rewardRouter = require("./reward/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/family", familyRouter);
app.use("/member", memberRouter);
app.use("/task", taskRouter);
app.use("/reward", rewardRouter);

const syncTables = async () => {
  await Family.hasMany(Member);
  await Member.belongsTo(Family);

  await Member.hasMany(Task);
  await Task.belongsTo(Member);

  await Family.hasMany(Task);
  await Task.belongsTo(Family);

  await Family.hasMany(Reward);
  await Reward.belongsTo(Family);

  await Family.sync();
  await Member.sync();
  await Task.sync();
  await Reward.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy!" });
});

app.listen(port, async () => {
  try {
    await syncTables();
    console.log("Database tables synced successfully!");
  } catch (error) {
    console.error("Error syncing tables.", error);
  }
  console.log(`App is listening ${port}`);
});
