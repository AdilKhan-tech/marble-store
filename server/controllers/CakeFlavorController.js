const CakeFlavor = require('../models/CakeFlavor');

class CakeFlavorController {

    static async createCakeFlavor(req, res) {
       try {
        const { name_en, name_ar, category_id, slug, additional_price, symbol, status } = req.body

        const image_url = req.file?.path || null;

        const cakeflavors = await CakeFlavor.create({
            name_en,
            name_ar,
            category_id,
            slug,
            additional_price,
            symbol,
            status,
            image_url,
        });
        return res.status(201).json({ message: "Cake flavor created successfully", cakeflavors});
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create cake flavor", error: err.message});
        }
    }

    static async getAllCakeFlavors(req,res) {
        try {
            const cakeflavors = await CakeFlavor.findAll();
            return res.status(200).json(cakeflavors);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to retrieve cake flavors", error: err.message});
        }
    }

    static async updateCakeFlavorById(req, res) {
        const { id } = req.params;
        const { name_en, name_ar, category_id, slug, additional_price, symbol, status, image_url } = req.body;
        try {
            const cakeflavors = await CakeFlavor.findByPk(id);
            if (!cakeflavors) {
                return res.status(404).json({ message: "Cake flavor not found" });
            }
            cakeflavors.name_en = name_en;
            cakeflavors.name_ar = name_ar;
            cakeflavors.category_id = category_id;
            cakeflavors.slug = slug;
            cakeflavors.additional_price = additional_price;
            cakeflavors.symbol = symbol;
            cakeflavors.status = status;
            cakeflavors.image_url = image_url;
    
            await cakeflavors.save();
            return res.status(200).json({ message: "Cake flavor updated successfully", cakeflavors });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteCakeFlavorById(req,res) {
        const { id } = req.params; 
        try {
            const cakeflavors = await CakeFlavor.findByPk(id);
            if (!cakeflavors) {
                return res.status(404).json({ message: "Cake flavor not found" });
            }
            await cakeflavors.destroy();
            return res.status(200).json({ message: "Cake flavor deleted successfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = CakeFlavorController;