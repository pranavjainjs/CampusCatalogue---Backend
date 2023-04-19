import { verifyToken } from "../services/cognitoPool.js";
export async function isAuth(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  let token;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken.replace(/['"]+/g, "");
  } else {
    next(new Error({ message: "AUTHORIZATION_TOKEN_MISSING", status: 403 }));
  }
  try {
    await verifyToken(token);
    next();
  } catch (err) {
    next(new Error({ message: "UNAUTHORIZED_ACCESS", status: 401 }));
  }
}
