const Occasion = require ("../models/Occasion");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class OccasionController {

    static async createOccasion (req, res, next) {
        try{
            const { name_en, name_ar, parent_ocassion, slug} = req.body;

            const image_url = req.file?.path || null;
            
            const occasion = await Occasion.create({
                name_en,
                name_ar,
                parent_ocassion,
                slug,
                image_url,
            });
            return res.status(201).json(occasion);
        }catch (error) {
          next(error);
        }
    }

    static async getAllOccasions(req, res) {

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
            "parent_ocassion",
          ];
    
          const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
          const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    
          const { count, rows } = await Occasion.findAndCountAll({
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
            message: "Failed to fetch occasions",
            error: error.message
          });
        }
    }

    static async updateOccasionById(req, res, next) {
        const { id } = req.params;
        try {
          const occasion = await Occasion.findByPk(id);
          if (!occasion) {
              return res.status(404).json({ message: "Occasion not found" });
          }
    
          const {name_en, name_ar, parent_ocassion, slug} = req.body;
    
          const image_url = req.file?.path || occasion.image_url;
    
          await occasion.update({
              name_en: name_en ?? occasion.name_en,
              name_ar: name_ar ?? occasion.name_ar,
              parent_ocassion: parent_ocassion ?? occasion.parent_ocassion,
              slug: slug ?? occasion.slug,
              image_url: image_url
          });
    
          return res.status(200).json(occasion);
    
        }catch (error) {
          next(error);
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
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

 module.exports = OccasionController;