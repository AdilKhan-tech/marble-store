const Category = require("../models/Category");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CategoryController {

    static async createCategory(req, res) {
        try {
            const { name_en, name_ar, slug, parent_category, display_type } = req.body;

            const image_url = req.file?.path || null;

            const category = await Category.create({
                name_en,
                name_ar,
                slug,
                parent_category,
                display_type,
                image_url
            });

            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create category", error: error.message });
        }
    }

    static async getAllCategories(req, res) {
        const { page, limit, offset } = getPagination(req);
        const { keywords, sortField, sortOrder } = req.query;

        try {
            const whereClause = {};

            if (keywords) {
                whereClause[Op.or] = [
                    { name_en: { [Op.like]: `%${keywords}%` } },
                    { name_ar: { [Op.like]: `%${keywords}%` } },
                ];
            }

            const allowedSortFields = [
                "id",
                "name_en",
                "slug",
                "display_type",
                "parent_category",
            ];

            const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
            const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

            const { count, rows } = await Category.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [[finalSortField, finalSortOrder]],
            });

            const pageCount = Math.ceil(count / limit);

            return res.status(200).json({
                pagination: {
                    page,
                    limit,
                    total: count,
                    pageCount,
                },
                data: rows,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch categories",
                error: error.message
            });
        }
    }

    static async updateCategoryById(req, res) {
        const { id } = req.params;
        const { name_en, name_ar, slug, parent_category, display_type } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            category.name_en = name_en;
            category.name_ar = name_ar;
            category.slug = slug;
            category.parent_category = parent_category;
            category.display_type = display_type;

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
