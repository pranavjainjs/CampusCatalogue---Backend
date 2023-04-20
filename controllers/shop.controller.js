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
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/shop/allShops
export const getAllShops = async (req, res) => {
  try {
    console.log(req);
    const shopDoc = await Shop.find({}).sort("-creation");
    res.status(200).json({
      status: "success",
      data: shopDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

export const postShop = async (req, res, next) => {
  try {
    var { name, phone_number } = req.body;
    console.log(name, phone_number);
    const doc = new Shop({
      name,
      phone_number,
    });
    console.log(doc);

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
