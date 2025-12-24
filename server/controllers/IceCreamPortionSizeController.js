const IceCreamPortionSize = require("../models/IceCreamPortionSize");

class IceCreamPortionSizeController {
  static async createIceCreamPortionSize(req, res) {
    try {
      const {icecream_bucket_id, name_en, name_ar,slug, additional_price, calorie,status} = req.body;

      const image_url = req.file?.path || null;

      const icecreamportionsizes = await IceCreamPortionSize.create({
        icecream_bucket_id,
        name_en,
        name_ar,
        slug,
        additional_price,
        calorie,
        status,
        image_url,
      });
      return res.status(201).json(icecreamportionsizes);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create ice cream", error: error.message });
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

  static async updateIceCreamPortionSize(req, res) {
    const { id } = req.params;
    try {
      const iceCreamPortionSize = await IceCreamPortionSize.findByPk(id);
      if (!iceCreamPortionSize) {
          return res.status(404).json({ message: "Ice Cream Portion Size not found" });
      }

      const {name_en, name_ar, icecream_bucket_id, slug, additional_price, calories,status} = req.body;

      const image_url = req.file?.path || iceCreamPortionSize.image_url;

      await iceCreamPortionSize.update({
          name_en: name_en ?? iceCreamPortionSize.name_en,
          name_ar: name_ar ?? iceCreamPortionSize.name_ar,
          icecream_bucket_id: icecream_bucket_id ?? iceCreamPortionSize.icecream_bucket_id,
          slug: slug ?? iceCreamPortionSize.slug,
          additional_price: additional_price ?? iceCreamPortionSize.additional_price,
          calories: calories ?? iceCreamPortionSize.calories,
          status: status ?? iceCreamPortionSize.status,
          image_url: image_url
      });

      return res.status(200).json(iceCreamPortionSize);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Failed to update Ice Cream Portion Size",error: error.message});
    }
  }

  static async deleteIceCreamPortionSizeById(req, res){
    const{id} = req.params;
    try{
      const icecreamportionsize = await IceCreamPortionSize.findByPk(id);
      if(!icecreamportionsize) {
        return res.status(404).json({ message: " Ice Cream Portion Size not found" });
      }
      await icecreamportionsize.destroy();
      return res.status(200).json({ message: "Ice Cream Portion Size deleted sucesfully" });

    }catch(error) {
      console.error(error);
      return res.status(500).json ({ message: error.message });
    }
  }
}
module.exports = IceCreamPortionSizeController;
