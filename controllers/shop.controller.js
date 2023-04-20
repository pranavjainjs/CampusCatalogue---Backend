import Shop from "../models/shop.model.js";


export const getShopById = async (req, res) => {
  try {
    const id = req.params.id;
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

export const postShop = async (req, res) => {
  try {
    console.log(req);
    var { name, phone_number } = req.body;
    const shopDoc = await new Shop({
      name,
      phone_number,
      // coordinates: { latitude: latitude, longitude: longitude },
      isOpened: false,
    }).save();

    res.status(201).json({
      status: "success",
      data: shopDoc,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};
