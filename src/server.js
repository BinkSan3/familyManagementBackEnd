require("dotenv").config();
const express = require("express");
require("./db/connection");
const cors = require("cors");

const Family = require("./family/model");
const familyRouter = require("./family/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/family", familyRouter);

const syncTables = async () => {
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
