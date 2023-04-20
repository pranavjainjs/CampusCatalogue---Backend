import { verifyToken } from "../services/cognitoPool.js";
export async function isAuth(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  let token;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken.replace(/['"]+/g, "");
  } else {
    const error = new Error("AUTHORIZATION_TOKEN_MISSING");
    error.code = 403;
    return next(error);
  }
  try {
    await verifyToken(token);
    next();
  } catch (err) {
    const error = new Error(err.message);
    error.code = 401;
    next(error);
  }
}
