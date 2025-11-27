const Gender = require("../models/Gender");

class GenderController {
    // CREATE gender
    static async createGender(req, res) {
        try {
            const { name_en, name_ar, slug } = req.body;

            const image_url = req.files?.[0]?.path || null;

            const gender = await Gender.create({
                name_en,
                name_ar,
                slug,
                image_url,
            });
            return res.status(201).json({ message: " Gender created successfully", gender });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create gender", error: err.message });
        }
    }

    static async getAllGenders(req, res) {
        try {
            const gender = await Gender.findAll();
            return res.status(200).json(gender);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to retrieve  genders", error: err.message });
        }
    }

    static async updateGender(req, res) {
        const { id } = req.params;
        const { name_en, name_ar, slug, image_url } = req.body;
        try {
            const gender = await Gender.findByPk(id);
            if (!gender) {
                return res.status(404).json({ message: "Gender not found" });
            }
            gender.name_en = name_en;
            gender.name_ar = name_ar;
            gender.slug = slug;
            gender.image_url = image_url;
            await gender.save();
            return res.status(200).json({ message: "Gender updated successfully", gender });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteGenderById(req, res) {
        const { id } = req.params;
        try {
            const gender = await Gender.findByPk(id);
            if (!gender) {
                return res.status(404).json({ message: "Gender not found" });
            }
            await gender.destroy();
            return res.status(200).json({ message: "Gender deleted successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to delete gender", error: err.message });
        }
    }
}

module.exports = GenderController;
