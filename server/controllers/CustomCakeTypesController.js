const CustomCakeTypes = require("../models/CustomCakeTypes");

class CustomCakeTypesController {
  static async createCustomCakeTypes(req, res) {
    try {
      const { name_en, name_ar, slug, status, image_url } = req.body;
      const customcaketypes = await CustomCakeTypes.create({
        name_en,
        name_ar,
        slug,
        status,
        image_url,
      });
      return res.status(201).json({message: "Custom cake type created successfully",customcaketypes,});
    } catch (err) {
      console.error(err);
      return res.status(500).json({message: "Failed to create custom cake type",error: err.message,});
    }
  }
  static async getAllCustomCakeTypes(req, res) {
    try {
      const customcaketypes = await CustomCakeTypes.findAll();
      return res.status(200).json(customcaketypes);

}
    catch (err) {
      console.error(err);
      return res.status(500).json({message: "Failed to retrieve custom cake types",error: err.message,});
    }
}
  static async updateCustomCakeTypesById(req, res) {
   try {
      const { id } = req.params;
      const { name_en, name_ar, slug, status, image_url } = req.body;
      const customcaketypes = await CustomCakeTypes.findByPk(id);
      if (!customcaketypes) {
        return res.status(404).json({ message: "Custom cake type not found" });
      }
      customcaketypes.name_en = name_en;
      customcaketypes.name_ar = name_ar;
      customcaketypes.slug = slug;
      customcaketypes.status = status;
      customcaketypes.image_url = image_url;

      await customcaketypes.save();
      return res.status(200).json({ message: "Custom cake type updated successfully", customcaketypes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
}
 static async deleteCustomCakeTypesById(req, res) {
  const { id } = req.params;
  try {
      const customcaketypes = await CustomCakeTypes.findByPk(id);
      if (!customcaketypes) {
          return res.status(404).json({ message: "Custom cake type not found" });
      }
      await customcaketypes.destroy();
      return res.status(200).json({ message: "Custom cake type deleted successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
}
}
}

module.exports = CustomCakeTypesController;
