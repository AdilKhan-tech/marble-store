const Category = require("../models/Category");
const { UPLOADS_URL } = require("../config/config");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CategoryController {

    static async createCategory(req, res, next) {
        try {
            const { name_en, name_ar, slug, parent_category, display_type } = req.body;

            const image_url = req.file ? req.file.filename : null;

            const category = await Category.create({
                name_en,
                name_ar,
                slug,
                parent_category,
                display_type,
                image_url
            });

            const responseData = {
            ...category.toJSON(),
            image_url: category.image_url
                ? `${UPLOADS_URL}/${category.image_url}`
                : null,
            };

            return res.status(201).json(responseData);
        } catch (error) {
            next(error);
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

            const data = rows.map(item => {
                const category = item.toJSON();
                return {
                ...category,
                image_url: category.image_url
                    ? `${UPLOADS_URL}/${category.image_url}`
                    : null,
                };
            });

            const pageCount = Math.ceil(count / limit);

            return res.status(200).json({
                pagination: {
                    page,
                    limit,
                    total: count,
                    pageCount,
                },
                data,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch categories",
                error: error.message
            });
        }
    }

    static async updateCategoryById(req, res, next) {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            const { name_en, name_ar, slug, parent_category, display_type } = req.body;
            let image_url = category.image_url;
            if (req.file) {
                image_url = req.file.filename;
            }

             await category.update({
                name_en: name_en ?? category.name_en,
                name_ar: name_ar ?? category.name_ar,
                slug: slug ?? category.slug,
                parent_category: parent_category ?? category.parent_category,
                display_type: display_type ?? category.display_type,
                image_url: image_url
             });
            
            const responseData = {
                ...category.toJSON(),
                image_url: category.image_url
                ? `${UPLOADS_URL}/${category.image_url}`
                : null,
            };
               return res.status(200).json(responseData);
        } catch (error) {
            next(error);
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
