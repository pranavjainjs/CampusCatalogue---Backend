import connectDatabase from "./services/connectDB.js";

connectDatabase();
import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", (req, res) => {
  res.send("user routes");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
