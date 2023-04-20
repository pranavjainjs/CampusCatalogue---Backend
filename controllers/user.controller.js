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

// http://localhost:8080/api/user/addUser
export const addUser = async (req, res) => {
  console.log("siudsdhho")
  try {
    var { name, email } = req.body;
    const userDoc = new Item({
      name,
      email,
    });
    await userDoc.save();

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
  try {
    const result = await logInUser(email, password);
    res.json({
      success: true,
      access_token: result.getAccessToken().getJwtToken(),
      id_token: result.getIdToken().getJwtToken(),
      refresh_token: result.getRefreshToken().getToken(),
    });
  } catch (err) {
    res.json({ success: false, message: `${err.code}` });
  }

  // const user = await Customer.findOne({ email });

  // if (!user)
  //   return res.json({
  //     success: false,
  //     message: "user not found, with the given phone number!",
  //   });

  // const isMatch = await user.comparePassword(password);
  // if (!isMatch)
  //   return res.json({
  //     success: false,
  //     message: "email / password does not match!",
  //   });

  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "1d",
  // });

  // let oldTokens = user.tokens || [];

  // if (oldTokens.length) {
  //   oldTokens = oldTokens.filter((t) => {
  //     const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
  //     if (timeDiff < 86400) {
  //       return t;
  //     }
  //   });
  // }

  // await Shop.findByIdAndUpdate(user._id, {
  //   tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  // });

  // const userInfo = {
  //   name: user.name,
  //   phone_number: user.phone_number,
  //   // avatar: user.avatar ? user.avatar : '',
  // };

  // res.json({ success: true, user: userInfo, token });
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
