import Shop from "../models/shop.model.js";

// http://localhost:8080/api/shop/getShopById?id=643294ae0463e80940048069
export const getShopById = async (req, res) => {
  try {
    const id = req.query.id;
    const shopDoc = await Shop.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: shopDoc,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/shop/getAllShopItems
// id required
export const getAllShopItems = async (req, res) => {
  try {
    const shopId = req.query.id;
    const shopDoc = await Shop.findOne({ _id: shopId }).populate("menu");
    res.status(200).json({
      status: "success",
      data: shopDoc.menu,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/shop/allShops
export const getAllShops = async (req, res) => {
  try {
    const shopDoc = await Shop.find({})
      .sort("-creation")
      .populate(["menu", "reviews", "bestSeller"]);
    res.status(200).json({
      status: "success",
      data: shopDoc,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};


// http://localhost:8080/api/shop/postShop
export const postShop = async (req, res, next) => {
  try {
    var { name, phone_number } = req.body;
    const doc = new Shop({
      name,
      phone_number,
    });

    const response = await doc.save();
    console.log(response);
    res.json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
