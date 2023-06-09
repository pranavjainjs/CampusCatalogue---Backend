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

// http://localhost:8080/api/user/getUserInfo?id=644190b6c4b806199ba92bd5
export const getUserInfo = async (req, res) => {
  try {
    const id = req.query.id;
    const userDoc = await User.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: userDoc,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/user/getFavouriteShops?id=644190b6c4b806199ba92bd5
export const getFavouriteShops = async (req, res) => {
  try {
    const userId = req.query.id;
    const userDoc = await User.findOne({ _id: userId }).populate(
      "favourites_shop"
    );
    res.status(201).json({
      status: "success",
      data: userDoc?.favourites_shop || "NOT_FOUND", // NOT_FOUND when the user has not added any shops to favourite
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
    const userDoc = await User.findOne({ _id: userId }).populate(
      "favourites_item"
    );
    res.status(200).json({
      status: "success",
      data: userDoc?.favourites_item || "NOT_FOUND", // NOT_FOUND when the user has not added any item to favourite
    });
  } catch (error) {
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// // http://localhost:8080/api/user/getFavouriteItems?userId=644190b6c4b806199ba92bd5
// exports.deleteFavouritesItems = async (req, res) => {
//   try {
//     const id = req.query.id;
//     // const FavouritesItemsData = await GroupMembers.findById(id);
//     const DeletedFavouritesItemData = await GroupMembers.findByIdAndDelete(id);
//     return res
//       .status(200)
//       .json({ status: "success", data: { DeletedFavouritesItemData } });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(424)
//       .json({ status: "Failed", message: "Request failed" });
//   }
// };

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
    console.log(err);
    res.json({ success: false, message: `${err.code}` });
  }
};

export const verifyCode = async (req, res) => {
  const { email, otp } = req.body;
  try {
    await verifyOTP(email, otp);

    res.json({ success: true, message: "OTP Verified Successfully" });
  } catch (err) {
    console.log(err);
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
    });
  } catch (err) {
    console.log(err);
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
    const data = await verifyToken(token);
    console.log(data);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
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
export const getUser = async (req, res, next) => {
  try {
    const userId = "644190b6c4b806199ba92bd5";
    const userDoc = await User.findOne({ _id: userId }).populate([
      "favourites_item",
      "orders",
      "favourites_shop",
    ]);
    res.json({
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
