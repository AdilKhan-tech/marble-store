const CakeSizes = require("../models/CakeSizes");

class CakeSizesController {

// Create a new Cake Size

    static async createCakeSizes(req, res) {
        try {
    const { category_id,name_en,name_ar,slug,scoop_size,additional_price,symbol,calories,status,image_url  } = req.body
     
    const cakesizes = await CakeSizes.create({
        category_id,
        name_en,
        name_ar,
        slug,
        scoop_size,
        additional_price,
        symbol,
        calories,
        status,
        image_url,
});
     return res.status(201).json({ message : "Cake size created successfully", cakesizes });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create cake size", error: err.message });
        
}
 }

 static async getAllCakeSizes (req, res) {
    try {
        const cakesizes = await CakeSizes.findAll();
        return res.status(200).json(cakesizes);
    } catch (err) {

        console.error(err);
            return res.status(500).json({ message: "Failedto retrieve cake sizes", error: err.message });   
    }
    }
    static async updateCakeSizesById(req, res) {
        const { id } = req.params;
        const { category_id,name_en,name_ar,slug,scoop_size,additional_price,symbol,calories,status,image_url } = req.body;
        try {
            const cakesizes = await CakeSizes.findByPk(id);
            if(!cakesizes) {
                return res.status(404).json({ message: "Cake size not found" });

}
            cakesizes.category_id = category_id;
            cakesizes.name_en = name_en;
            cakesizes.name_ar = name_ar;
            cakesizes.slug = slug;
            cakesizes.scoop_size = scoop_size;
            cakesizes.additional_price = additional_price;
            cakesizes.symbol = symbol;
            cakesizes.calories = calories;
            cakesizes.status = status;
            cakesizes.image_url = image_url;
     
            await cakesizes.save();
            return res.status(200).json({ message: "Cake size updated successfully", cakesizes });
        }  catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
  }
static async deleteCakeSizesById(req, res) {
    try {
        const { id } = req.params;
        const cakesizes = await CakeSizes.findByPk(id);
        if(!cakesizes) {
            return res.status(404).json({ message: "Cake size not found" });
        }
        await cakesizes.destroy();
        return res.status(200).json({ message: "Cake size deleted successfully" });     
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
  }
}
module.exports = CakeSizesController;