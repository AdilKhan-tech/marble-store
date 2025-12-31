const IceCreamAddOn = require("../models/IceCreamAddOn");

class IceCreamAddOnController {
  static async createIceCreamAddOn(req, res) {
    try {
      const { name_en, name_ar, slug, type, status } = req.body;

      const image_url = req.file?.path || null;

      const iceCreamaddon = await IceCreamAddOn.create({
        name_en,
        name_ar,
        slug,
        type,
        status,
        image_url,
      });
      return res.status(201).json(iceCreamaddon);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create IceCream AddOn", error: error.message });
    }
  }

  static async getAllIceCreamAddOns(req, res) {
    try {
      const iceCreamaddon = await IceCreamAddOn.findAll();

      return res.status(200).json(iceCreamaddon);
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve  IceCream AddOn", error: error.message });
    }
  }

  static async updateIceCreamAddOnById(req, res) {
    const { id } = req.params;
    try {
      const iceCreamaddon = await IceCreamAddOn.findByPk(id);
      if(!iceCreamaddon) {
        return res.status(404).json({ message: "IceCream AddOn not found" });
      }

      const { name_en, name_ar, slug, type, status, } = req.body;

      const image_url = req.file?.path || iceCreamaddon.image_url;

      await iceCreamaddon.update({
        name_en: name_en ?? iceCreamaddon.name_en,
        name_ar: name_ar ?? iceCreamaddon.name_ar,
        slug: slug ?? iceCreamaddon.slug,
        type: type ?? iceCreamaddon.type,
        status: status ?? iceCreamaddon.status,
        image_url: image_url
      });

      return res.status(200).json({message: "IceCream AddOn updated successfully",iceCreamaddon});

    }catch (error) {
      return res.status(500).json({message: "Failed to update IceCream AddOn",error: error.message});
    }
  }

  static async deleteIceCreamAddOnById(req, res) {
    const { id } = req.params;
    try {
      const iceCreamaddon = await IceCreamAddOn.findByPk(id);
      if (!iceCreamaddon) {
        return res.status(404).json({ message: "IceCream AddOn not found" });
      }
      await iceCreamaddon.destroy();
      return res.status(201).json({ message: "IceCream AddOn deleted suucessfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = IceCreamAddOnController;
