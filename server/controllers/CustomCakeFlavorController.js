const { CustomCakeFlavor, CustomCakeTypes} = require("../models");

class CustomCakeFlavorController {

  static async createCustomCakeFlavor(req, res) {
    try {
      const { name_en, name_ar, custom_cake_type_id, slug, status } = req.body;

      const image_url = req.file?.path || null;

      const customCakeFlavor = await CustomCakeFlavor.create({
        name_en,
        name_ar,
        custom_cake_type_id,
        slug,
        status,
        image_url,
      });
      return res.status(200).json(customCakeFlavor);
    } catch (error) {
      return res.status(500).json({message: "Failed to create Custom Cake Flavor",error: error.message,});
    }
  }

  static async getAllCustomCakeFlavor(req, res) {
    try {
      const customCakeFlavor = await CustomCakeFlavor.findAll({
        include: [
              {
                model: CustomCakeTypes,
                as: "customCakeType",
                attributes: ["id", "name_en", "name_ar"],
              },
            ],
      });
      return res.status(200).json(customCakeFlavor);
    } catch (error) {
      return res.status(500).json({message: "Failed to get Custom Cake Flavor",error: error.message,});
    }
  }

  static async updateCustomCakeFlavorById(req, res) {
    const { id } = req.params;
    try {
      const customCakeFlavor = await CustomCakeFlavor.findByPk(id);
      if (!customCakeFlavor) {
        return res.status(404).json({ message: "Custom cake flavor not found." });
      }
      const { name_en, name_ar, custom_cake_type_id, slug, status } = req.body;

      const image_url = req.file?.path || customCakeFlavor.image_url;

      await customCakeFlavor.update({
        name_en: name_en ?? customCakeFlavor.name_en,
        name_ar: name_ar ?? customCakeFlavor.name_ar,
        custom_cake_type_id: custom_cake_type_id ?? customCakeFlavor.custom_cake_type_id,
        slug: slug ?? customCakeFlavor.slug,
        status: status ?? customCakeFlavor.status,
        image_url: image_url ?? customCakeFlavor.image_url,
      });
      return res.status(200).json({message: "Custom cake flavor updated successfully.",customCakeFlavor,});
    } catch (error) {
      return res.status(500).json({message: "Failed to update custom cake flavor",error: error.message,});
    }
  }

  static async deleteCustomCakeFlavorById(req, res) {
    try {
      const { id } = req.params;
      const customCakeFlavor = await CustomCakeFlavor.findByPk(id);
      if(!customCakeFlavor) {
        return res.status(404).json({ message: "Cake size not found" });
      }
      await customCakeFlavor.destroy();
      return res.status(200).json({ message: "Custom Cake Flavor Deleted successfully" });     
    }
    catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
module.exports = CustomCakeFlavorController;
