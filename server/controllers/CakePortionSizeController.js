const { UPLOADS_URL } = require("../config/config");
const CakePortionSize = require("../models/CakePortionSize");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");


class CakePortionSizeController {

    static async createCakePortionSize(req, res, next) {
        try {
            const { name_en, name_ar, slug, parent_portion_size } = req.body

            const image_url = req.file ? req.file.filename : null;
            const cakePortionSize = await CakePortionSize.create({
                name_en,
                name_ar,
                slug,
                parent_portion_size,
                image_url,
            });
          
          const responseData = {
            ...cakePortionSize.toJSON(),
            image_url: cakePortionSize.image_url
              ? `${UPLOADS_URL}/${cakePortionSize.image_url}`
              : null,
          };
            return res.status(201).json(responseData);
        }catch (error) {
          next(error);
        }
    }

    static async getAllCakePortionSizes(req, res) {
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
            "parent_portion_size",
          ];
      
          const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
          const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
      
          const { count, rows } = await CakePortionSize.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [[finalSortField, finalSortOrder]],
          });

          const data = rows.map(item => {
            const cakePortionSize = item.toJSON();
            return {
              ...cakePortionSize,
              image_url: cakePortionSize.image_url ? `${UPLOADS_URL}/${cakePortionSize.image_url}` : null,
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
            message: "Failed to retrieve Cake Portion Sizes",
            error: error.message,
          });
        }
    }

    static async updateCakePortionSizeById(req, res, next) {
        const { id } = req.params;
        
        try {
            const cakePortionSize = await CakePortionSize.findByPk(id);
        
            if (!cakePortionSize) {
                return res.status(404).json({ message: "Cake Portion Size not found" });
            }
        
            const { name_en, name_ar, slug, parent_portion_size } = req.body;
        
            let image_url = cakePortionSize.image_url;
              if (req.file) {
                image_url = req.file.filename;
              }
        
            await cakePortionSize.update({
                name_en: name_en ?? cakePortionSize.name_en,
                name_ar: name_ar ?? cakePortionSize.name_ar,
                slug: slug ?? cakePortionSize.slug,
                parent_portion_size: parent_portion_size ?? cakePortionSize.parent_portion_size,
                image_url,
            });
            const responseData = {
              ...cakePortionSize.toJSON(),
              image_url: cakePortionSize.image_url
                ? `${UPLOADS_URL}/${cakePortionSize.image_url}`
                : null,
            };
            return res.status(200).json(responseData);
        }catch (error) {
          next(error);
        }
    }
      
    static async deleteCakePortionSizeById(req, res) {
        const { id } = req.params;
        try {
            const cakePortionSize = await CakePortionSize.findByPk(id);
            if (!cakePortionSize) {
                return res.status(404).json({ message: "Cake Portion Size not found" });
            }
            await cakePortionSize.destroy();
            return res.status(200).json({ message: "Cake Portion Size deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CakePortionSizeController;