import { Jwt } from "jsonwebtoken";
import Shop from "../models/shop.model.js";

export const createUser = async (req, res) => {
  const { name, phone_number, password } = req.body;
  const isNewUser = await Shop.isThisPhonenoInUse(phone_number);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  const user = await Shop({
    name,
    phone_number,
    password,
  });
  await user.save();
  res.json({ success: true, user });
};

export const userSignIn = async (req, res) => {
  const { phone_number, password } = req.body;

  const user = await Shop.findOne({ phone_number });

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given phone number!",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await Shop.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    name: user.name,
    phone_number: user.phone_number,
    // avatar: user.avatar ? user.avatar : '',
  };

  res.json({ success: true, user: userInfo, token });
};

export const signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
};
