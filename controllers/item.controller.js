import Item from "../models/item.model.js";


// http://localhost:8080/api/item/getItemById?id=643294ad0463e80940048065
export const getItemById = async (req, res) => {
  try {
    const id = req.query.id;
    const itemDoc = await Item.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: itemDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/item/allItems
export const getAllItems = async (req, res) => {
  try {
    console.log(req);
    const itemDoc = await Item.find({}).sort("-creation");
    res.status(200).json({
      status: "success",
      data: itemDoc,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

export const postItem = async (req, res) => {
  try {
    console.log(req);
    var { name, phone_number } = req.body;
    const itemDoc = await new Item({
      name,
      phone_number,
      // coordinates: { latitude: latitude, longitude: longitude },
      isOpened: false,
    }).save();

    res.status(201).json({
      status: "success",
      data: itemDoc,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};