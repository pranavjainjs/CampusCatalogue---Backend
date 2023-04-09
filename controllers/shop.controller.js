import Shop from "../models/shop.model.js";
import { Item } from "../models/order.model.js";

import mongoose from "mongoose";

export const getShopById = async (req, res) => {
  try {
    const id = req.params.id;
    const shopDoc = await Shop.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: shopDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shopDoc = await Shop.find({}).sort("-creation");
    res.status(200).json({
      status: "success",
      data: shopDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
