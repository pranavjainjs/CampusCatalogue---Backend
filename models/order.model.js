import mongoose, { model, mongo, Schema } from "mongoose";
const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  order_number: { type: Number, required: true },
  items_name: [{ type: String, required: true }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  total_price: { type: Number, required: true },
});
export const Order = new model("Order", OrderSchema);

const ItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  veg: { type: Boolean, required: true },
});
export const Item = new model("Item", ItemSchema);
