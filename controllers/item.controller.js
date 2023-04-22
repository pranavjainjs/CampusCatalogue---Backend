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
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/item/allItems
export const getAllItems = async (req, res) => {
  try {
    const itemDoc = await Item.find({}).sort("-creation");
    res.status(200).json({
      status: "success",
      data: itemDoc,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
};

// http://localhost:8080/api/item/postItem
export const postItem = async (req, res) => {
  try {
    var { name, price, rating, veg } = req.body;
    const itemDoc = new Item({
      name,
      price,
      rating,
      veg,
    });
    await itemDoc.save();

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
