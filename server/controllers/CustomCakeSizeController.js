const CustomCakeSize = require("../models/CustomCakeSize");

class CustomCakeSizeController {
  static async createCustomCakeSize(req, res) {
    try {
      const {
        name_en,
        name_ar,
        cake_type_id,
        slug,
        portion_size,
        sort,
        calories,
        status,
      } = req.body;
      const image_url = req.file?.path || null;

      const customCakeSize = await CustomCakeSize.create({
        name_en,
        name_ar,
        cake_type_id,
        slug,
        portion_size,
        sort,
        calories,
        status,
        image_url,
      });
      return res.status(200).json(customCakeSize);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Failed to create Custom Cake Size",
          error: error.message,
        });
    }
  }

  static async getAllCustomCakeSize(req, res) {
    try {
      const customCakeSize = await CustomCakeSize.findAll();
      return res.status(200).json(customCakeSize);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Failed to get Custom Cake Flavor",
          error: error.message,
        });
    }
  }

  static async deleteCustomCakeSize(req, res) {
    try {
      const { id } = req.params;
    } catch (error) {}
  }
}
module.exports = CustomCakeSizeController;
