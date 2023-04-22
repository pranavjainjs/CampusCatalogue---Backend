import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";

// http://localhost:8080/api/order/getOrdersByUserId?id=644190b6c4b806199ba92bd5
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.query.id;
    const userDoc = await User.findOne({ _id: userId }).populate([
      "favourites_item",
      "orders",
      "favourites_shop",
    ]);
    res.status(200).json({
      status: "success",
      data: userDoc ? userDoc.orders : "no data fetched",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/order/getOrdersByShopId?id=643294ae0463e80940048069
export const getOrdersByShopId = async (req, res) => {
  try {
    const shopId = req.query.id;
    const orderDoc = await Shop.findOne({ _id: shopId }).populate("orders");
    res.status(200).json({
      status: "success",
      data: orderDoc.orders,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/shop/postOrder
export const postOrder = async (req, res, next) => {
  try {
    const {
      userId,
      shopId,
      bill,
      order_number,
      approved_status,
      total_price,
      payment_status,
    } = req.body;
    const doc = new Order({
      userId,
      shopId,
      bill,
      order_number,
      approved_status,
      total_price,
      payment_status,
    });

    const response = await doc.save();
    console.log(response);
    res.json({
      status: "success",
      data: doc,
    });

    const orderId = doc._id;

    // adding orderId to user
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.orders.push(orderId);
      await user.save();

      console.log("order added to user list");
      // res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }

    // adding orderId to shop
    try {
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }

      shop.orders.push(orderId);
      await shop.save();

      console.log("order added to shop list");
      // res.json(shop);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/order/updateApprovedStatus
export const updateApprovedStatus = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const orderDoc = await Order.findOne({ _id: orderId });
    orderDoc.approved_status = true;
    await orderDoc.save();
    res.status(200).json({
      status: "success",
      data: orderDoc.approved_status,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/order/updatePaymentStatus
export const updatePaymentStatus = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const orderDoc = await Order.findOne({ _id: orderId });
    orderDoc.payment_status = true;
    await orderDoc.save();

    res.status(200).json({
      status: "success",
      data: orderDoc.payment_status,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
