const CookiesBoxTypes = require('../models/CookiesBoxTypes');

class CookiesTypesController {

    static async createCookieType (req, res){
        try {
            const {name_en, name_ar, slug, sort, status} = req.body;

            const image_url = req.file?.path || null;

            const cookiesTypes = await CookiesBoxTypes.create({
                name_en,
                name_ar,
                slug,
                sort,
                status,
                image_url,
            });
            return res.status(201).json(cookiesTypes);

        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies Types",
                error: error.message
            });
        }
    }

    static async getAllCookiesTypes (req, res) {
        try {
            const cookiesTypes = await CookiesBoxTypes.findAll();

            return res.status(200).json(cookiesTypes);

        } catch(error) {
            res.status(500).json({message: "Failed to get Cookies Types", error: error.message});
        }
    }

    static async updateCookieTypeById(req, res) {
        const { id } = req.params;
        try {
            const cookiesTypes = await CookiesBoxTypes.findByPk(id);
            if (!cookiesTypes) {
                return res.status(404).json({ message: "Cookies Types not found" });
            }
    
            const { name_en, name_ar, slug, sort, status } = req.body;

            const image_url = req.file?.path || cookiesTypes.image_url;
    
            await cookiesTypes.update({
                name_en: name_en ?? cookiesTypes.name_en,
                name_ar: name_ar ?? cookiesTypes.name_ar,
                slug: slug ?? cookiesTypes.slug,
                sort: sort ?? cookiesTypes.sort,
                status: status ?? cookiesTypes.status,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookies Types updated successfully",cookiesTypes});
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Cookies Types",error: error.message});
        }
    }

    static async deleteCookieTypeById(req, res) {
        try {
            const { id } = req.params;
    
            const cookiesTypes = await CookiesBoxTypes.findByPk(id);
    
            if (!cookiesTypes) {
                return res.status(404).json({
                    message: "Cookies Types not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookiesTypes.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookiesTypes.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookiesTypes.destroy();
    
            return res.status(200).json({message: "Cookies Types deleted successfully"});
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Cookies Types",
                error: error.message
            });
        }
    }
    
}
module.exports = CookiesTypesController;    