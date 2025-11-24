const Category = require("../models/Category");

class CategoryController {

    // CREATE category
    static async createCategory(req, res) {
        try {
            const { name, description, slug } = req.body;

            const category = await Category.create({
                name,
                description,
                slug,
            });

            return res.status(201).json({ message: "Category created successfully", category });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create category", error: err.message });
        }
    }

    // GET all categories
    static async getAllCategories(req, res) {
        try {
            const categories = await Category.findAll();
            return res.status(200).json({ categories });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch categories", error: err.message });
        }
    }

    static async updateRoomType(req, res) {
        const { id } = req.params;
        const { name, description, slug } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            category.name = name;
            category.description = description;
            category.slug = slug;
            await category.save();
            return res.status(200).json({message: "Category updated successfully", category});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      await category.destroy();
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }

}

module.exports = CategoryController;
