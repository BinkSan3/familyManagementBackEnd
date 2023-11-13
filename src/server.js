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

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());
//RMI|NDER
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//     credentials: true,
//   })
// );

const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus :200,
};
app.use("/family", cors(corsOptions), familyRouter);
app.use("/member", cors(corsOptions), memberRouter);
app.use("/task", cors(corsOptions), taskRouter);

const syncTables = async () => {
  await Family.hasMany(Member);
  await Member.belongsTo(Family);

  await Member.hasMany(Task);
  await Task.belongsTo(Member);

  await Family.hasMany(Task);
  await Task.belongsTo(Family);

  await Task.sync();
  await Member.sync();
  await Family.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy!" });
});

app.listen(port, async () => {
  try {
    await syncTables();
    console.log("Database tables synced succesfully!");
  } catch (error) {
    console.error("Error syncing tables.", error);
  }
  console.log(`App is listening ${port}`);
});
