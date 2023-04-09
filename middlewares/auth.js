// import { verify } from "jsonwebtoken";

// import { findById } from "../models/user";

// export async function isAuth(req, res, next) {
//   if (req.headers && req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];

//     try {
//       const decode = verify(token, process.env.JWT_SECRET);
//       const user = await findById(decode.userId);
//       if (!user) {
//         return res.json({ success: false, message: "unauthorized access!" });
//       }

//       req.user = user;
//       next();
//     } catch (error) {
//       if (error.name === "JsonWebTokenError") {
//         return res.json({ success: false, message: "unauthorized access!" });
//       }
//       if (error.name === "TokenExpiredError") {
//         return res.json({
//           success: false,
//           message: "sesson expired try sign in!",
//         });
//       }

//       res.res.json({ success: false, message: "Internal server error!" });
//     }
//   } else {
//     res.json({ success: false, message: "unauthorized access!" });
//   }
// }
