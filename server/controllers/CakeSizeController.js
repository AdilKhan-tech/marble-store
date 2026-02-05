const { CakeSize, Category } = require("../models");
const { UPLOADS_URL } = require("../config/config");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CakeSizeController {

  static async createCakeSize(req, res, next) {
      try {
        const { name_en,name_ar,cake_category_id,slug,scoop_size,additional_price,calories,status } = req.body

        const image_url = req.file ? req.file.filename : null;
          
        const cakeSize = await CakeSize.create({
            name_en,
            name_ar,
            cake_category_id,
            slug,
            scoop_size,
            additional_price,
            calories,
            status,
            image_url,
        });
          
        const responseData = {
          ...cakeSize.toJSON(),
          image_url: cakeSize.image_url
            ? `${UPLOADS_URL}/${cakeSize.image_url}`
            : null,
        };

        return res.status(201).json(responseData);

      } catch (error) {
        next(error);
      }
  }

  static async getAllCakeSizes(req, res) {
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
        "scoop_size",
        "additional_price",
        "status",
        "cake_category_id",
      ];

      const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      // 🔹 Get parent_id of Cake category
      const cakeParent = await Category.findOne({
        where: { slug: "Cakes" }, // ya name_en: "Cake"
        attributes: ["id"],
      });
      const cakeParentId = cakeParent ? cakeParent.id : null;
      
      const { count, rows } = await CakeSize.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Category,
            as: "cakeCategory",
            attributes: ["id", "name_en", "name_ar", "parent_id", "slug"],
            where: { parent_id: cakeParentId },
            required: true, // sirf matching sub-categories
          },
        ],
        limit,
        offset,
        order: [[finalSortField, finalSortOrder]],
      });

      // 🔥 IMAGE URL BUILD
      const data = rows.map(item => {
        const cake = item.toJSON();
        return {
          ...cake,
          image_url: cake.image_url ? `${UPLOADS_URL}/${cake.image_url}` : null,
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
        message: "Failed to get cake sizes",
        error: error.message,
      });
    }
  }

    
  static async updateCakeSizeById(req, res, next) {
      const { id } = req.params;
      try {
          const cakeSize = await CakeSize.findByPk(id);
          if (!cakeSize) {
              return res.status(404).json({ message: "Cake size not found" });
          }
          const {
              cake_category_id,
              name_en,
              name_ar,
              slug,
              scoop_size,
              additional_price,
              calories,
              status
          } = req.body;

          // ✅ IMPORTANT: image ko overwrite mat karo agar new image nahi aayi
          let image_url = cakeSize.image_url;
          if (req.file) {
            image_url = req.file.filename;
          }

          await cakeSize.update({
            name_en: name_en ?? cakeSize.name_en,
            name_ar: name_ar ?? cakeSize.name_ar,
            cake_category_id: cake_category_id ?? cakeSize.cake_category_id,
            slug: slug ?? cakeSize.slug,
            scoop_size: scoop_size ?? cakeSize.scoop_size,
            additional_price: additional_price ?? cakeSize.additional_price,
            calories: calories ?? cakeSize.calories,
            status: status ?? cakeSize.status,
            image_url: image_url
          });
  
          // 🔥 BUILD FULL IMAGE URL FOR FRONTEND
          const responseData = {
            ...cakeSize.toJSON(),
            image_url: cakeSize.image_url
              ? `${UPLOADS_URL}/${cakeSize.image_url}`
              : null,
          };

          return res.status(200).json(responseData);
  
      } catch (error) {
          next(error);
      }
  }

  static async deleteCakeSizeById(req, res) {
      try {
          const { id } = req.params;
          const cakeSize = await CakeSize.findByPk(id);
          if(!cakeSize) {
              return res.status(404).json({ message: "Cake size not found" });
          }
          await cakeSize.destroy();
          return res.status(200).json({ message: "Cake size deleted successfully" });     
      }
      catch (err) {
          return res.status(500).json({ message: err.message });
      }
  }

}

module.exports = CakeSizeController;