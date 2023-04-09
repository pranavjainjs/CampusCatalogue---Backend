import User from "../models/user.model.js";
export const getFavourites = async (req, res) => {
  const userDoc = await User.findOne();

  const userFavourites = User.res.json({ "sending favoutes": "fjodisjf" });
};
