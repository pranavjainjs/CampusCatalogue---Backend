import mongoose, { model, mongo, Schema } from "mongoose";
const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  order_number: { type: Number, required: true },
  items_name: [{ type: String, required: true }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  total_price: { type: Number, required: true },
  approved_status: { type: Boolean, required: true },
  payment_status: { type: Boolean, required: true },
});
const Order = new model("Order", OrderSchema);
export default Order;
