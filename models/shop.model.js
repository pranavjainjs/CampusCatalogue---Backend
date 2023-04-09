import mongoose, { model, mongo, Schema } from "mongoose";
const shopSchema = new Schema({
  name: { type: String },
  phone_number: { type: Number },
  rating: { type: Number },
  coordinates: { latitude: { type: String }, longitude: { type: String } },
  isOpened: { type: Boolean, required: true },
  menu: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  reviews: [
    {
      customerName: { type: String },
      reviewText: { type: String },
      reviewRating: { type: String },
    },
  ],
  bestSeller: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

shopSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

shopSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is mission, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

shopSchema.statics.isThisPhonenoInUse = async function (phone_number) {
  if (!phone_number) throw new Error("Invalid Phone Number");
  try {
    const user = await this.findOne({ phone_number });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisPhonenoInUse method", error.message);
    return false;
  }
};

const Shop = model("Shop", ShopSchema);
export default Shop;
