const Gender = require("../models/Gender");

class GenderController {

    static async createGender(req, res) {
        try {
            const { name_en, name_ar, parent_gender, slug } = req.body;

            const image_url = req.file?.path || null;

            const gender = await Gender.create({
                name_en,
                name_ar,
                parent_gender,
                slug,
                image_url,
            });
            return res.status(201).json(gender);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create gender", error: error.message });
        }
    }

    static async getAllGenders(req, res) {
        try {
            const gender = await Gender.findAll();
            return res.status(200).json(gender);
        } catch (error) {
            return res.status(500).json({ message: "Failed to retrieve  genders", error: error.message });
        }
    }

    static async updateGenderById(req, res) {
        const { id } = req.params;
        const { name_en, name_ar, slug, parent_gender, image_url } = req.body;
        try {
            const gender = await Gender.findByPk(id);
            if (!gender) {
                return res.status(404).json({ message: "Gender not found" });
            }
            gender.name_en = name_en;
            gender.name_ar = name_ar;
            gender.parent_gender = parent_gender;
            gender.slug = slug;
            gender.image_url = image_url;
            await gender.save();
            return res.status(200).json({ message: "Gender updated successfully", gender });
        } catch (error) {
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
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete gender", error: error.message });
        }
    }
}

module.exports = GenderController;
