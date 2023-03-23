import mongoose, { model, mongo, Schema } from "mongoose";

const customerSchema = new Schema({
  name: { type: String, require: true },
  roll_number: { type: Number },
  hostel: { type: String },
  phone_number: { type: Number, require: true },
  email: { type: String },
});
//export const Customer = new model("Customer", CustomerSchema);

customerSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

customerSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};

customerSchema.statics.emailInUse = async function (email) {
  if (!email) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};

module.exports = mongoose.model('Customer', customerSchema);

//export const Shop = new model("Shop", ShopSchema);
