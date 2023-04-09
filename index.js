import express from "express";
import connectDatabase from "./services/connectDB.js";
connectDatabase();

import favourites from "./routes/favourites.routes.js";
// import customerauth from "./routes/customerauth.routes.js";
import shopRoutes from "./routes/shop.routes.js";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", (req, res) => {
  res.send("user routes");
});

app.use("/api/shop", shopRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
