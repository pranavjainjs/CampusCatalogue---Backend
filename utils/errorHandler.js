export const errorLogger = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};
export const errorResponder = (error, request, response, next) => {
  response.header("Content-Type", "application/json");

  const status = error.status || 400;
  response.json({ err: error.message, success: false });
};
