// const jwt = require("jsonwebtoken");
// import User from "../models/user.model";
import env from "dotenv";
env.config();
import {
  logInUser,
  registerUser,
  verifyOTP,
  verifyToken,
  renewToken,
} from "../services/cognitoPool.js";
import User from "../models/user.model.js";

export const getFavouriteShops = async (req, res) => {
  try {
    const userId = req.query.id;
    const userDoc = await User.findOne({ _id: userId }).populate(
      "favourites_shop"
    );
    res.status(201).json({
      status: "success",
      data: userDoc.favourites_shop,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/user/addUser
export const addUser = async (req, res) => {
  try {
    var { name, email } = req.body;
    console.log(name, email);
    const userDoc = new User({
      name,
      email,
    });
    const data = await userDoc.save();
    console.log(data);
    res.status(201).json({
      status: "success",
      data: userDoc,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/user/getFavouriteItems?userId=644190b6c4b806199ba92bd5
export const getFavouritesItems = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userDoc = await User.findOne({ _id: userId }).populate("favourites_item");
    res.status(200).json({
      status: "success",
      data: userDoc.favourites_item,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// cognito apis

let user;
export const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  user = {
    fullname,
    email,
    password,
  };
  try {
    await registerUser(email, password);
    res.json({ success: true, userInfo: user });
  } catch (err) {
    res.json({ success: false, message: `${err.code}` });
  }
};

export const verifyCode = async (req, res) => {
  const { email, otp } = req.body;
  try {
    await verifyOTP(email, otp);

    res.json({ success: true, message: "OTP Verified Successfully" });
  } catch (err) {
    res.json({ success: false, message: `${err.code}` });
  }
};

export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const result = await logInUser(email, password);
    res.json({
      success: true,
      access_token: result.getAccessToken().getJwtToken(),
      id_token: result.getIdToken().getJwtToken(),
      refresh_token: result.getRefreshToken().getToken(),
      g,
    });
  } catch (err) {
    res.json({ success: false, message: `${err.code}` });
  }
};

export const verifyJWT = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  let token;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken.replace(/['"]+/g, "");
  } else {
    console.log("Empty Authorization Header");
  }
  try {
    await verifyToken(token);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, errorMessage: err.message });
  }
};
export const renewJWT = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  let token;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken.replace(/['"]+/g, "");
  } else {
    console.log("Empty Authorization Header");
  }
  try {
    const data = await renewToken(token);
    res.json({ success: true, data });
  } catch (err) {
    console.log(err);
    res.json({ success: false, errorMessage: err.message });
  }
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
