import Order from "../models/order.model.js";

export const getOrdersByUserId = async (req, res) => {
  try {
    const orderId = req.body.id;
    const orderDoc = await Order.findOne({ _id: orderId });
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
