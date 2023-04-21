import mongoose from "mongoose";
import Shop from "./../models/shop.model.js";
import Item from "./../models/item.model.js";
import connectDatabase from "../services/connectDB.js";

connectDatabase();

const shopIds = [
  "643294ae0463e8094004806f",
  "6442e27e11de60cbf12db456",
  "6442e50a7aba67faa9211530",
  "6442e50a7aba67faa9211534",
];

const mockItems = [
  {
    name: "Spicy chicken burger",
    price: 8.99,
    rating: 4.5,
    shopId: shopIds[0],
    veg: false,
  },
  {
    name: "French fries",
    price: 3.49,
    rating: 3.2,
    shopId: shopIds[0],
    veg: true,
  },
  {
    name: "Vanilla milkshake",
    price: 4.99,
    rating: 4.8,
    shopId: shopIds[0],
    veg: true,
  },
  // items for shop with objectId "6442e27e11de60cbf12db456"
  {
    name: "Margherita pizza",
    price: 12.99,
    rating: 4.3,
    shopId: shopIds[1],
    veg: true,
  },
  {
    name: "Garlic bread",
    price: 4.99,
    rating: 4.1,
    shopId: shopIds[1],
    veg: true,
  },
  {
    name: "Tiramisu",
    price: 6.99,
    rating: 4.7,
    shopId: shopIds[1],
    veg: true,
  },
  // items for shop with objectId "6442e50a7aba67faa9211530"
  {
    name: "Beef noodles",
    price: 9.99,
    rating: 4.2,
    shopId: shopIds[2],
    veg: false,
  },
  {
    name: "Spring rolls",
    price: 5.99,
    rating: 3.8,
    shopId: shopIds[2],
    veg: true,
  },
  {
    name: "Matcha ice cream",
    price: 3.99,
    rating: 4.5,
    shopId: shopIds[2],
    veg: true,
  },
  // items for shop with objectId "6442e50a7aba67faa9211534"
  {
    name: "BBQ ribs",
    price: 14.99,
    rating: 4.6,
    shopId: shopIds[3],
    veg: false,
  },
  {
    name: "Sweet potato fries",
    price: 5.99,
    rating: 3.9,
    shopId: shopIds[3],
    veg: true,
  },
  {
    name: "Apple pie",
    price: 4.99,
    rating: 4.3,
    shopId: shopIds[3],
    veg: true,
  },
];

Item.insertMany(mockItems)
  .then(() => {
    console.log("Data inserted");
  })
  .catch((error) => {
    console.log(error);
  });
