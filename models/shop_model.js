import mongoose, { model, mongo, Schema } from "mongoose";
const ShopSchema = new Schema({
  name: { type: String },
  phone_number: { type: Number },
  rating: { type: Number },
  coordinates: { latitude: { type: String }, longitude: { type: String } },
  isOpened: { type: Boolean, required: true },
});
export const Shop = new model("Shop", ShopSchema);
