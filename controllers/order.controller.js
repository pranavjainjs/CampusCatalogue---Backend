import Order from "../models/order.model.js";

export const getOrdersByUserId = async (req, res) => {
  try {
    const id = req.body.userId;
    const orderDoc = await Order.findOne({ userId: id });
    res.status(200).json({
      status: "success",
      data: orderDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
