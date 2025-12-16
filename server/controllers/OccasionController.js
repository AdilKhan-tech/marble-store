const Occasion = require ("../models/Occasion");

class OccasionController {

    static async createOccasion (req, res) {
        try{
            const { name_en, name_ar,slug} = req.body;

            const image_url = req.file?.path || null;    

            const occasion = await Occasion.create({
                name_en,
                name_ar,
                slug,
                image_url,
            });
            return res.status(201).json(occasion);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({message: "Failed to create occasion", error: error.message});
        }
    }

    static async getAllOccasions (req, res) {
        try{
            const occasions = await Occasion.findAll();
            return res.status(200).json({ occasions })

        }catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch occasions", error: err.message });
        }
    }

    static async updateOccasionById(req, res) {
        const { id } = req.params;
        try {
          const occasion = await Occasion.findByPk(id);
          if (!occasion) {
              return res.status(404).json({ message: "Occasion not found" });
          }
    
          const {name_en, name_ar, slug} = req.body;
    
          const image_url = req.file?.path || occasion.image_url;
    
          await occasion.update({
              name_en: name_en ?? occasion.name_en,
              name_ar: name_ar ?? occasion.name_ar,
              slug: slug ?? iceCreamPortionSize.slug,
              image_url: image_url
          });
    
          return res.status(200).json(occasion);
    
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