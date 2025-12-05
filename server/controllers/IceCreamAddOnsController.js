const IceCreamAddOns = require("../models/IceCreamAddOns");

class IceCreamAddOnsController {
  static async createIceCreamAddOns(req, res) {
    try {
      const { name_en, name_ar, slug, add_on_type, add_on_status, image_url } =
        req.body;
      const icecreamaddons = await IceCreamAddOns.create({
        name_en,
        name_ar,
        slug,
        add_on_type,
        add_on_status,
        image_url,
      });
      return res.status(201).json({ message: "IceCreamAddOns created successfully", icecreamaddons });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "IceCreamAddOns", error: error.message });
    }
  }
  static async getAllIceCreamAddOns(req, res) {
    try {
      const icecreamaddons = await IceCreamAddOns.findAll();
      return res.status(200).json(icecreamaddons);
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: "IceCreamAddOns failed to get",error: error.message,});
    }
  }
  static async updateIceCreamAddOnsById(req, res) {
    const { id } = req.params;
    const { name_en, name_ar, slug, add_on_type, add_on_status, image_url } =
      req.body;
    try {
      const icecreamaddons = await IceCreamAddOns.findByPk(id);
      if (!icecreamaddons) {
        return res.status(404).json({ message: "IceCreamAddOns not found" });
      }
      icecreamaddons.name_en = name_en;
      icecreamaddons.name_ar = name_ar;
      icecreamaddons.slug = slug;
      icecreamaddons.add_on_type = add_on_type;
      icecreamaddons.add_on_status = add_on_status;
      icecreamaddons.image_url = image_url;
      await icecreamaddons.save();
      return res.status(200).json({ message: "IceCreamAddOns updated successfully", icecreamaddons });
    } catch (error) {
      console.error(error);
      return res.status(200).json({ message: error.message });
    }
  }
  static async deleteIceCreamAddOnsById(req, res) {
    const { id } = req.params;
    try {
      const icecreamaddons = await IceCreamAddOns.findByPk(id);
      if (!icecreamaddons) {
        return res.status(404).json({ message: "IceCreamAddOnsn not found" });
      }
      await icecreamaddons.destroy();
      return res.status(201).json({ message: "IceCreamAddOns  deleted suucessfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = IceCreamAddOnsController;
