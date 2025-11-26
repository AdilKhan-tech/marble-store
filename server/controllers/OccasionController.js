const { json } = require("sequelize");
const Occasion = require ("../models/Occasion");

class OccasionController {

    // CREATE occasion
    static async createOccasion (req, res) {
        try{
            const { name_en, name_ar,slug} = req.body;

            const image_url = req.files?.[0]?.path || null;
    
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
static async  updateOccasionById (req, res) {
      const { id } = req.params;
        const { name_en, name_ar, slug, image_url } = req.body;
        try {
             const occasion = await Occasion.findByPk(id);
            if (!occasion) {
                return res.status(404).json({ message: "Occasion not found" });
      }
            occasion.name_en = name_en;
            occasion.name_ar = name_ar;
            occasion.slug= slug;
            occasion.image_url = image_url;
            await occasion.save();
            return res.status(200).json({message: "Occasion updated successfully", occasion});
        } catch (error) {
            console.error(error )
            return res.status(500).json({ message: error.message });
        }

    }

 static async deleteOccasionById (req, res) {
        const { id} = req.params;
        try {
            const occasion = await Occasion.findByPk(id);
            if (!occasion) {
                return res.status(404).json({ message: "Occasion not found" });
            }
            await occasion.destroy();
            return res.status(200).json({ message: "Occasion deleted successfully" });
        }
        catch (err) {
              console.error(err);
            return res.status(500).json({ message: err.message });
 }
}
}

 module.exports = OccasionController;