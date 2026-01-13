const { CakePortionSize } = require("../models");

class CakePortionSizeController {

  static async createCakePortionSize(req, res) {
      try {
          const { name_en, name_ar, slug, parent_portion_size } = req.body

          const image_url = req.file?.path || null;
          
          const cakePortionSize = await CakePortionSize.create({
              name_en,
              name_ar,
              slug,
              parent_portion_size,
              image_url,
          });
          return res.status(201).json(cakePortionSize);
      } catch (err) {
          return res.status(500).json({ message: "Failed to create cake portion size", error: err.message });
      }
  }

}

module.exports = CakePortionSizeController;