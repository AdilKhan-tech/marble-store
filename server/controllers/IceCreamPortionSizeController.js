const IceCreamPortionSize = require("../models/IceCreamPortionSize");

class IceCreamPortionSizeController {
  static async createIceCreamPortionSize(req, res) {
    try {
      const {
        icecream_bucket_id,
        name_en,
        name_ar,
        slug,
        additional_price,
        calorie,
        image_url,
      } = req.body;
      const icecreamportionsizes = await IceCreamPortionSize.create({
        icecream_bucket_id,
        name_en,
        name_ar,
        slug,
        additional_price,
        calorie,
        image_url,
      });
      return res.status(201).json({
        message: "Ice Cream Portion Size created succesfully",
        icecreamportionsizes,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to create ice cream", error: error.message });
    }
  }
  static async getAllIceCreamPortionSize(req, res) {
    try {
      const icecreamportionsize = await IceCreamPortionSize.findAll();
      return res.status(200).json(icecreamportionsize);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failde to create IceCreamPortionSize ",
        error: error.message,
      });
    }
  }
}
module.exports = IceCreamPortionSizeController;
