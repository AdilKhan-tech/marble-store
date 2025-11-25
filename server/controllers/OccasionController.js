const { json } = require("sequelize");
const Occasion = require ("../models/Occasion");

class OccasionController {

    // CREATE occasion
    static async createOccasion (req, res) {
        try{
            const { name_en, name_ar,slug, image_url} = req.body;
    
            const occasion = await Occasion.create({
                name_en,
                name_ar,
                slug,
                image_url,
            });
            return res.status(201).json({ message: "Occasion created successfully", occasion });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create occasion", error: err.message });
        }
    }
    // GET all occasions
    static async getAllOccasions (req, res) {
        try{
            const occasions = await Occasion.findAll();
            return res.status(200).json({ occasions })

        }catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch occasions", error: err.message });
        }
    }
}

 module.exports = OccasionController;