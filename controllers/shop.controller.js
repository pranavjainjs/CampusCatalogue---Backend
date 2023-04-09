import Shop from "../models/shop.model.js";
import { Item } from "../models/order.model.js";

import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://test:codZGPi3d4AWxyUj@cluster0.46ugves.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });

export const getShopById = async (req, res) => {
  const id = req.params.id;
  const ShopDoc = await Shop.findOne({ _id: id });
  console.log(ShopDoc);
  res.status(200).json({
    status: "success",
    data: ShopDoc,
  });
};
