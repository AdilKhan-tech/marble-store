const Category = require("../models/Category");

class CategoryController {

    static async createCategory(req, res) {
        try {
            const { name_en, name_ar, slug, description } = req.body;

            const image_url = req.files?.[0]?.path || null;

            const category = await Category.create({
                name_en,
                name_ar,
                slug,
                description,
                image_url
            });

            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create category", error: error.message });
        }
    }

    static async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll();
            return res.status(200).json({ categories });
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch categories", error: error.message });
        }
    }

    static async updateCategoryById(req, res) {
        const { id } = req.params;
        const { name_en, name_ar, slug, description } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            category.name_en = name_en;
            category.name_ar = name_ar;
            category.slug = slug;
            category.description = description;
            await category.save();
            return res.status(200).json({message: "Category updated successfully", category});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.destroy();
            return res.status(200).json({ message: "Category deleted successfully" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

}

module.exports = CategoryController;
