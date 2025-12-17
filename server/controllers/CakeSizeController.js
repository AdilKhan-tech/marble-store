const CakeSize = require("../models/CakeSize");
const CustomCakeTypes = require("../models/CustomCakeTypes");

class CakeSizeController {

    static async createCakeSizes(req, res) {
        try {
            const { name_en,name_ar,custom_cake_type_id,slug,scoop_size,additional_price,symbol,calories,status } = req.body

            const image_url = req.file?.path || null;
            
            const cakesizes = await CakeSize.create({
                name_en,
                name_ar,
                custom_cake_type_id,
                slug,
                scoop_size,
                additional_price,
                symbol,
                calories,
                status,
                image_url,
            });
            return res.status(201).json(cakesizes);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create cake size", error: err.message });
        }
    }

    static async getAllCakeSizes (req, res) {
        try {
            const cakesizes = await CakeSize.findAll({
                include: [
                  {
                    model: CustomCakeTypes,
                    as: "customCakeType",
                    attributes: ["id", "name_en", "name_ar"],
                  },
                ],
              });
            return res.status(200).json(cakesizes);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failedto retrieve cake sizes", error: err.message });   
        }
    }

    static async updateCakeSizesById(req, res) {
        const { id } = req.params;
    
        try {
            const cakesizes = await CakeSize.findByPk(id);
            if (!cakesizes) {
                return res.status(404).json({ message: "Cake size not found" });
            }
    
            const {
                custom_cake_type_id,
                name_en,
                name_ar,
                slug,
                scoop_size,
                additional_price,
                symbol,
                calories,
                status
            } = req.body;

            const image_url = req.file?.path || cakesizes.image_url;

            let parsedStatus = cakesizes.status;
    
            if (status !== undefined) {
                if (status === 'true' || status === true || status === '1' || status === 1) {
                    parsedStatus = true;
                } else if (status === 'false' || status === false || status === '0' || status === 0) {
                    parsedStatus = false;
                }
            }

            await cakesizes.update({
                name_en: name_en ?? cakesizes.name_en,
                name_ar: name_ar ?? cakesizes.name_ar,
                custom_cake_type_id: custom_cake_type_id ?? cakesizes.custom_cake_type_id,
                slug: slug ?? cakesizes.slug,
                scoop_size: scoop_size ?? cakesizes.scoop_size,
                additional_price: additional_price ?? cakesizes.additional_price,
                symbol: symbol ?? cakesizes.symbol,
                calories: calories ?? cakesizes.calories,
                status: parsedStatus,
                image_url: image_url
            });
    
            return res.status(200).json({
                message: "Cake size updated successfully",
                cakesizes
            });
    
        } catch (error) {
            console.error("UPDATE ERROR:", error);
            return res.status(500).json({ message: "Failed to update cake size", error: error.message });
        }
    }

    static async deleteCakeSizesById(req, res) {
        try {
            const { id } = req.params;
            const cakesizes = await CakeSize.findByPk(id);
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
module.exports = CakeSizeController;