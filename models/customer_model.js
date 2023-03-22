import mongoose, { model, mongo, Schema } from "mongoose";

const CustomerSchema = new Schema({
  name: { type: String, require: true },
  roll_number: { type: Number },
  hostel: { type: String },
  phone_number: { type: Number, require: true },
  email: { type: String },
});
export const Customer = new model("Customer", CustomerSchema);
