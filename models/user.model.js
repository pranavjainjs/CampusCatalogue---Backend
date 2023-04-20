import mongoose, { model, mongo, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, require: true },
  roll_number: { type: Number },
  hostel: { type: String },
  phone_number: { type: Number, require: true },
  email: { type: String },
  favourites_item: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  favourites_shop: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
});
//export const Customer = new model("Customer", CustomerSchema);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is mission, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

userSchema.statics.emailInUse = async function (email) {
  if (!email) throw new Error("Invalid Email");
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

// module.exports = mongoose.model('Customer', customerSchema);
const User = model("User", userSchema);
export default User;
