const {CookiesBoxSizes, CookiesBoxTypes } = require ("../models")

class CookiesBoxSizesController {
    
    static async createCookiesBoxSizes (req, res) {
        try {
            const {name_en, name_ar, cookies_types_id, slug, portion_size, price, symbol, calories, status} = req.body;

            const image_url = req.file?.path || null;

            const cookiesBoxSize = await CookiesBoxSizes.create({
                name_en,
                name_ar,
                cookies_types_id,
                slug,
                portion_size,
                price,
                symbol,
                calories,
                status,
                image_url,
            })

            return res.status(201).json({message: "Cookies Box Size created successfully", cookiesBoxSize});
        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies Box Size",
                error: error.message
            });
        }
    }

    static async getAllCookiesBoxSizes (req, res) {
        try {
            const cookiesBoxSize = await CookiesBoxSizes.findAll({
            include: [
              {
                model: CookiesBoxTypes,
                as: "type",
                attributes: ["id", "name_en", "name_ar"],
              },
            ],
          });
            return res.status(200).json(cookiesBoxSize);

        }catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies",
                error: error.message
            });
        }
    }

    static async updateCookiesBoxSizesById(req, res) {
        const { id } = req.params;
        try {
            const cookiesBoxSize = await CookiesBoxSizes.findByPk(id);
            if (!cookiesBoxSize) {
                return res.status(404).json({ message: "Cookies box size not found" });
            }
    
            const {
                name_en,
                name_ar,
                cookies_type_id,
                slug,
                portion_size,
                price,
                symbol,
                calories,
                status,
            } = req.body;

            const image_url = req.file?.path || cookiesBoxSize.image_url;
    
            let parsedStatus = cookiesBoxSize.status;
    
            if (status !== undefined) {
                if (status === 'true' || status === true || status === '1' || status === 1) {
                    parsedStatus = true;
                }
                else if (status === 'false' || status === false || status === '0' || status === 0) {
                    parsedStatus = false;
                }
            }
    
            await cookiesBoxSize.update({
                name_en: name_en ?? cookiesBoxSize.name_en,
                name_ar: name_ar ?? cookiesBoxSize.name_ar,
                cookies_type_id: cookiesBoxSize ?? cookiesBoxSize.cookies_type_id,
                slug: slug ?? cookiesBoxSize.slug,
                portion_size: portion_size ?? cookiesBoxSize.portion_size,
                price: price ?? cookiesBoxSize.price,
                symbol: symbol ?? cookiesBoxSize.symbol,
                calories: calories ?? cookiesBoxSize.calories,
                status: parsedStatus,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookies box size updated successfully",cookiesBoxSize});
    
        } catch (error) {
            console.error("UPDATE ERROR:", error);
            return res.status(500).json({message: "Failed to update Cookies box size",error: error.message});
        }
    }

    static async deleteCookiesBoxSizesById(req, res) {
        try {
            const { id } = req.params;
    
            const cookiesBoxSize = await CookiesBoxSizes.findByPk(id);
    
            if (!cookiesBoxSize) {
                return res.status(404).json({
                    message: "Cookies box size not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookiesBoxSize.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookiesBoxSize.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookiesBoxSize.destroy();
    
            return res.status(200).json({message: "Cookies box size deleted successfully"});
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Cookies box size",
                error: error.message
            });
        }
    }
}

module.exports = CookiesBoxSizesController;