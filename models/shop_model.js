import mongoose, { model, mongo, Schema } from "mongoose";
const shopSchema = new Schema({
  name: { type: String },
  phone_number: { type: Number },
  rating: { type: Number },
  coordinates: { latitude: { type: String }, longitude: { type: String } },
  isOpened: { type: Boolean, required: true },
});


shopSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

shopSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};

shopSchema.statics.isThisPhonenoInUse = async function (phone_number) {
  if (!email) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({ phone_number });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};

module.exports = mongoose.model('Shop', shopSchema);

//export const Shop = new model("Shop", ShopSchema);
