const { CakeSize, CustomCakeTypes } = require("../models");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CakeSizeController {

  static async createCakeSize(req, res, next) {
      try {
          const { name_en,name_ar,custom_cake_type_id,slug,scoop_size,additional_price,calories,status } = req.body

          const image_url = req.file?.path || null;
          
          const cakeSize = await CakeSize.create({
              name_en,
              name_ar,
              custom_cake_type_id,
              slug,
              scoop_size,
              additional_price,
              calories,
              status,
              image_url,
          });
          return res.status(201).json(cakeSize);
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
        "custom_cake_type_id",
      ];

      const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const { count, rows } = await CakeSize.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: CustomCakeTypes,
            as: "customCakeType",
            attributes: ["id", "name_en", "name_ar"],
          },
        ],
        limit,
        offset,
        order: [[finalSortField, finalSortOrder]],
      });

      // 🔥 PROFESSIONAL PART
      const baseUrl = process.env.APP_URL;

      const data = rows.map(item => {
        const json = item.toJSON();
        return {
          ...json,
          image_url: json.image_url
            ? `${baseUrl}/${json.image_url}`
            : null,
        };
      });
  
      const pageCount = Math.ceil(count / limit);
  
      // return res.status(200).json({
      //   pagination: {
      //     page,
      //     limit,
      //     total: count,
      //     pageCount,
      //   },
      //   data: rows,
      // });
      // ✅ FINAL RESPONSE
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
      return res.status(500).json({ message: "Failed to get cake sizes",error: error.message });
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
              custom_cake_type_id,
              name_en,
              name_ar,
              slug,
              scoop_size,
              additional_price,
              calories,
              status
          } = req.body;

          const image_url = req.file?.path || cakeSize.image_url;

          await cakeSize.update({
            name_en: name_en ?? cakeSize.name_en,
            name_ar: name_ar ?? cakeSize.name_ar,
            custom_cake_type_id: custom_cake_type_id ?? cakeSize.custom_cake_type_id,
            slug: slug ?? cakeSize.slug,
            scoop_size: scoop_size ?? cakeSize.scoop_size,
            additional_price: additional_price ?? cakeSize.additional_price,
            calories: calories ?? cakeSize.calories,
            status: status ?? cakeSize.status,
            image_url: image_url
          });
  
          return res.status(200).json(cakeSize);
  
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