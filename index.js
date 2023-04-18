import express from "express";
import connectDatabase from "./services/connectDB.js";
import bodyParser from "body-parser";
connectDatabase();
// import customerauth from "./routes/customerauth.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import userRoutes from "./routes/user.routes.js";
import userAuthRoutes from "./routes/userauth.routes.js";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(bodyParser.json());
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shop", shopRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
