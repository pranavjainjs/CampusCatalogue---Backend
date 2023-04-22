import mongoose, { model, mongo, Schema } from "mongoose";

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  order_number: { type: Number },
  bill: [
    {
      name: { type: String },
      isVeg: { type: Boolean, default: false },
      itemPrice: { type: Number },
      totalPrice: { type: Number },
      quantity: { type: Number, min: 1 },
    },
  ],
  total_price: { type: Number, required: true },
  approved_status: { type: Boolean, default: false },
  payment_status: { type: Boolean, default: false },
});

const Order = new model("Order", OrderSchema);
export default Order;
