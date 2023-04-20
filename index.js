import express from "express";
import connectDatabase from "./services/connectDB.js";
import bodyParser from "body-parser";
connectDatabase();
import { errorResponder, errorLogger } from "./utils/errorHandler.js";
import shopRoutes from "./routes/shop.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";
import itemRoutes from "./routes/item.routes.js";
import userAuthRoutes from "./routes/userauth.routes.js";
import { isAuth } from "./middlewares/isAuth.js";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//api requests
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/user", isAuth, userRoutes);
app.use("/api/shop", isAuth, shopRoutes);
app.use("/api/order", isAuth, orderRoutes);
app.use("/api/item", isAuth, itemRoutes);

//for error handling
app.use(errorLogger);
app.use(errorResponder);

// , "192.168.1.15"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
