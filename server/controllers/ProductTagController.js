const ProductTag = require('../models/ProductTag');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class ProductTagController {

    static async createProductTag(req, res) {
        try {
            const {name_en,name_ar,slug,} = req.body;
    
            const productTag = await ProductTag.create({
                name_en,
                name_ar,
                slug,
            });
            return res.status(201).json(productTag);
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to create Product Tag",
                error: error.message
            });
        }
    }
    static async getAllProductTag(req, res) {
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
            "name_ar",
            "slug",
          ];
    
          const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
          const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    
          const { count, rows } = await ProductTag.findAndCountAll({
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
            message: "Failed to get Product Tag",
            error: error.message,
          });
        }
    }

    static async updateProductTagById(req, res) {
        const { id } = req.params;
        try {
            const productTag = await ProductTag.findByPk(id);
            if (!productTag) {
                return res.status(404).json({ message: "Product Tag not found" });
            }
    
            const {
                name_en,
                name_ar,
                slug,
            } = req.body;

            await productTag.update({
                name_en: name_en ?? productTag.name_en,
                name_ar: name_ar ?? productTag.name_ar,
                slug: slug ?? productTag.slug,
            });

            return res.status(200).json(productTag);
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Product Tag",error: error.message});
        }
    }

    static async deleteProductTagById(req, res) {
        try {
            const { id } = req.params;
    
            const productTag = await ProductTag.findByPk(id);
    
            if (!productTag) {
                return res.status(404).json({
                    message: "Product Tag not found"
                });
            }    
    
            // Delete from database
            await productTag.destroy();
    
            return res.status(200).json({
                message: "Product Tag deleted successfully"
            });
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Product Tag",
                error: error.message
            });
        }
    }
}
module.exports = ProductTagController;