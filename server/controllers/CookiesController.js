const { Cookies, CookiesBoxTypes } = require('../models');

class CookiesController {

    static async createCookie (req, res){
        try {
            const {name_en, name_ar, cookie_type_id, slug, sort, status} = req.body;

            const image_url = req.file?.path || null;

            const cookies = await Cookies.create({
                name_en,
                name_ar,
                cookie_type_id,
                slug,
                sort,
                status,
                image_url,
            });
            return res.status(201).json(cookies);

        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies",
                error: error.message
            });
        }
    }

    static async getAllCookies (req, res) {
        try {
            const cookies = await Cookies.findAll({
                include: [
                    {
                        model:CookiesBoxTypes,
                        as: "type",
                        attributes: ["id", "name_en", "name_ar"]
                    }
                ]
            });
            return res.status(200).json(cookies);

        } catch(error) {
            res.status(500).json({message: "Failed to get Cookies", error: error.message});
        }
    }

    static async updateCookieById(req, res) {
        const { id } = req.params;
        try {
            const cookies = await Cookies.findByPk(id);
            if (!cookies) {
                return res.status(404).json({ message: "Cookies not found" });
            }
    
            const {
                name_en,
                name_ar,
                cookie_type_id,
                slug,
                sort,
                status
            } = req.body;

            const image_url = req.file?.path || cookies.image_url;
    
            let parsedStatus = cookies.status;
    
            if (status !== undefined) {
                if (status === 'true' || status === true || status === '1' || status === 1) {
                    parsedStatus = true;
                }
                else if (status === 'false' || status === false || status === '0' || status === 0) {
                    parsedStatus = false;
                }
            }
    
            await cookies.update({
                name_en: name_en ?? cookies.name_en,
                name_ar: name_ar ?? cookies.name_ar,
                cookie_type_id: cookie_type_id ?? cookies.cookie_type_id,
                slug: slug ?? cookies.slug,
                sort: sort ?? cookies.sort,
                status: parsedStatus,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookies updated successfully",cookies});
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Cookies",error: error.message});
        }
    }

    static async deleteCookieById(req, res) {
        try {
            const { id } = req.params;
    
            const cookies = await Cookies.findByPk(id);
    
            if (!cookies) {
                return res.status(404).json({
                    message: "Cookies not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookies.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookies.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookies.destroy();
    
            return res.status(200).json({message: "Cookies deleted successfully"});
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Cookies",
                error: error.message
            });
        }
    }
    
}
module.exports = CookiesController;    