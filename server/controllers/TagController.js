const Tag = require('../models/Tag');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class TagController {

    static async createTag(req, res, next) {
        try {
            const { name_en, name_ar, slug } = req.body;
 
            const tag = await Tag.create({
                name_en,
                name_ar,
                slug,
            });
         
            return res.status(201).json(tag);
        }catch (error) {
          next(error);
        }
    }

    static async getAllTags(req, res) {
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
      
          const { count, rows } = await Tag.findAndCountAll({
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
            message: "Failed to retrieve  Tag",
            error: error.message,
          });
        }
    }

    static async updateTagById(req, res, next) {
        const { id } = req.params;

        try {
            const tag = await Tag.findByPk(id);

            if (!tag) {
                return res.status(404).json({ message: " Tag not found" });
            }
            
            const { name_en, name_ar, slug } = req.body;

            await tag.update({
                name_en: name_en ?? tag.name_en,
                name_ar: name_ar ?? tag.name_ar,
                slug: slug ?? tag.slug,
            });

            return res.status(200).json(tag);
        }catch (error) {
          next(error);
        }
    }

    static async deleteTagById (req, res) {
        const { id } = req.params;
        try {
            const tag = await Tag.findByPk(id);
            if (!tag) {
                return res.status(404).json({ message: " Tag not found"});
            }
            await tag.destroy();
            return res.status(200).json({ message: " Tag deleted successfully" });
        }catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TagController;