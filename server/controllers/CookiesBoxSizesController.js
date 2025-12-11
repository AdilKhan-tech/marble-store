const CookiesBoxSizes = require ("../models/ CookiesBoxSizes")

class CookiesBoxSizesController {
    
    static async createCookiesBoxSizes (req, res) {
        try {
            const {name_en, name_ar, cookies_types_id, slug, portion_size, price, symbol, calories, status} = req.body;

            const image_url = req.files?.[0]?.path || null;

            const cookiesBoxSize = await CookiesBoxSizes.create({
                name_en,
                name_ar,
                cookies_types_id,
                slug,
                portion_size,
                price,
                symbol,
                calories,
                status
            })

            return res.status(201).json({message: "Cookies Box Size created successfully", cookiesBoxSize});
        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies Box Size",
                error: error.message
            });
        }
    }
}

module.exports = CookiesBoxSizesController;