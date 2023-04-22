import mongoose from "mongoose";
import Shop from "./../models/shop.model.js";
import Item from "./../models/item.model.js";
import connectDatabase from "../services/connectDB.js";
import Order from "../models/order.model.js";

connectDatabase();

const shopIds = [
  "643294ae0463e8094004806f",
  "6442e27e11de60cbf12db456",
  "6442e50a7aba67faa9211530",
  "6442e50a7aba67faa9211534",
];

const orders = {
  shopId: shopIds[1],
  order_number: Math.floor(Math.random() * 1000) + 1,
  bill: [
    {
      name: "Pasta",
      isVeg: true,
      itemPrice: Math.floor(Math.random() * 10) + 5,
      totalPrice: (Math.floor(Math.random() * 5) + 1) * 10,
      quantity: Math.floor(Math.random() * 3) + 1,
    },
    {
      name: "Veg fried rice",
      isVeg: true,
      itemPrice: Math.floor(Math.random() * 7) + 3,
      totalPrice: (Math.floor(Math.random() * 3) + 1) * 10,
      quantity: Math.floor(Math.random() * 2) + 1,
    },
    {
      name: "Veg cheese sandwich",
      isVeg: true,
      itemPrice: Math.floor(Math.random() * 7) + 3,
      totalPrice: (Math.floor(Math.random() * 3) + 1) * 10,
      quantity: Math.floor(Math.random() * 2) + 1,
    },
  ],
  total_price: (Math.floor(Math.random() * 5) + 1) * 10,
  approved_status: false,
  payment_status: false,
};

Order.insertMany(orders)
  .then(() => {
    console.log("Data inserted");
  })
  .catch((error) => {
    console.log(error);
  });
