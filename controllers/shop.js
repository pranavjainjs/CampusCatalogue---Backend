import { Shop } from "../models/shop_model.js";
import { Item } from "../models/order_model.js";

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

// Create some dummy items
const items = [
  { name: "Pizza", price: 12.99, rating: 4.5, shopId: null, veg: false },
  { name: "Burger", price: 8.99, rating: 4.2, shopId: null, veg: false },
  { name: "Pasta", price: 10.99, rating: 4.8, shopId: null, veg: true },
];
// Item.insertMany(items);

Item.insertMany(items).then((result) => {
  console.log("Items created", result);

  // Create some dummy shops
  const shops = [
    {
      name: "Pizza Shop",
      phone_number: 1234567890,
      rating: 4.5,
      coordinates: { latitude: "51.5074° N", longitude: "0.1278° W" },
      isOpened: true,
      menu: [result[0]._id, result[2]._id],
      reviews: [
        { customerName: "John", reviewText: "Great pizza!", reviewRating: "5" },
        {
          customerName: "Kate",
          reviewText: "Amazing food!",
          reviewRating: "4",
        },
      ],
      bestSeller: [result[0]._id],
    },
    {
      name: "Burger Joint",
      phone_number: 9876543210,
      rating: 4.2,
      coordinates: { latitude: "40.7128° N", longitude: "74.0060° W" },
      isOpened: true,
      menu: [result[1]._id, result[2]._id],
      reviews: [
        {
          customerName: "Tom",
          reviewText: "Best burger in town!",
          reviewRating: "5",
        },
        {
          customerName: "Mary",
          reviewText: "Great service!",
          reviewRating: "4",
        },
      ],
      bestSeller: [result[1]._id],
    },
    {
      name: "Italian Restaurant",
      phone_number: 1231231234,
      rating: 4.8,
      coordinates: { latitude: "48.8566° N", longitude: "2.3522° E" },
      isOpened: true,
      menu: [result[0]._id, result[2]._id],
      reviews: [
        {
          customerName: "Bob",
          reviewText: "Authentic Italian food!",
          reviewRating: "5",
        },
        {
          customerName: "Alice",
          reviewText: "Great ambiance!",
          reviewRating: "4",
        },
      ],
      bestSeller: [result[2]._id],
    },
  ];

  // Associate the items with their respective shops using the shopId field
  shops.forEach((shop) => {
    shop.menu.forEach((itemId, index) => {
      shop.menu[index] = result.find((item) => item._id.equals(itemId))._id;
    });
    shop.bestSeller.forEach((itemId, index) => {
      shop.bestSeller[index] = result.find((item) =>
        item._id.equals(itemId)
      )._id;
    });
  });

  Shop.insertMany(shops)
    .then((result) => {
      console.log("Shops created", result);
    })
    .catch((error) => {
      console.log("Connection failed", error);
    });
});

// export const getShop = async (req, res) => {
//   res.json({ "sending shop data": "fjodisjf" });
// };
