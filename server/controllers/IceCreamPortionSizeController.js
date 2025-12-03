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
      return res.status(201).json({message: "Ice Cream Portion Size created succesfully",icecreamportionsizes,});
    } catch (error) {
      console.error(error);
      return res
        .status(500).json({ message: "Failed to create ice cream", error: error.message });
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
  const {icecream_bucket_id,name_en,name_ar,slug,additional_price,calorie,image_url,} = req.body;
try {
    const icecreamportionsize = await IceCreamPortionSize.findByPk(id);
   if (!icecreamportionsize) {
   return res.status(404).json({ message : "IceCreamPortionSize not found" });
}
  icecreamportionsize.icecream_bucket_id = icecream_bucket_id;
  icecreamportionsize.name_en = name_en;
  icecreamportionsize.name_ar = name_ar;
  icecreamportionsize.slug = slug;
  icecreamportionsize.additional_price = additional_price;
  icecreamportionsize.calorie = calorie;
  icecreamportionsize.image_url = image_url;
  
   await icecreamportionsize.save();
   return res.status(200).json({ message: "icecreamportionsize updated succesfully", icecreamportionsize });
}
   catch (error) {
   console.error(error);
   return res.status(500).json({ message: error.message });
}
}
  static async deleteIceCreamPortionSizeById(req, res){
  const{id} = req.params;
 try{
   const icecreamportionsize = await IceCreamPortionSize.findByPk(id);
   if(!icecreamportionsize) {
    return res.status(404).json({ message : " Ice Cream Portion Size not found" });
}
   await icecreamportionsize.destroy();
   return res.status(200).json({ message: "Ice Cream Portion Size deleted sucesfully" });
}
   catch(error) {
   console.error(error);
    return res.status(500).json ({ message: error.message });
   }
 }
}
module.exports = IceCreamPortionSizeController;
