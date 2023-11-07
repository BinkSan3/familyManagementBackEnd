require("dotenv").config();
const express = require("express");
require("./db/connection");
const cors = require("cors");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.json(200).json({ message: "API is healthy!" });
});

app.listen(port, async () => {
  //   try {
  //     await syncTables();
  //     console.log("Database tables synced successfully");
  //   } catch (error) {
  //     console.error("Error syncing tables.", error);
  //   }
  console.log("App is listening...");
});
