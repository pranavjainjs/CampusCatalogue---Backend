import mongoose, { model, mongo, Schema } from "mongoose";

const ItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
  veg: { type: Boolean, required: true },
});
const Item = new model("Item", ItemSchema);
export default Item;
