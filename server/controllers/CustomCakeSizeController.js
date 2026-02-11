
const { CustomCakeType, CustomCakeSize } = require("../models");
const { UPLOADS_URL } = require("../config/config")
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CustomCakeSizeController {
  static async createCustomCakeSize(req, res, next) {
    try {
      const {name_en,name_ar,custom_cake_type_id,slug,scoope_size,sort,calories,status,} = req.body;
      const image_url = req.file ? req.file.filename : null;

      const customCakeSize = await CustomCakeSize.create({
        name_en,
        name_ar,
        custom_cake_type_id,
        slug,
        scoope_size,
        sort,
        calories,
        status,
        image_url,
      });
       const responseData = {
             ...customCakeSize.toJSON(),
             image_url: customCakeSize.image_url
               ? `${UPLOADS_URL}/${customCakeSize.image_url}` 
               : null,
       };
      return res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCustomCakeSize(req, res) {
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
        "scoope_size",
        "sort",
        "status",
        "custom_cake_type_id",
      ];
      const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const { count, rows } = await CustomCakeSize.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: CustomCakeType,
            as: "customCakeTypes",
            attributes: ["id", "name_en", "name_ar"]
          },
        ],
        limit,
        offset,
        order: [[finalSortField, finalSortOrder]],
      });
        //  IMAGE URL BUILD HERE
       const data = rows.map(item => {
        const cake = item.toJSON();
        return {
          ...cake,
          image_url: cake.image_url
            ? `${UPLOADS_URL}/${cake.image_url}`
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
        message: "Failed to get Custom Cake Size",
        error: error.message,
      });
    }
  }

  static async deleteCustomCakeSizeById(req, res) {
    const { id } = req.params;
    try {
      const customCakeSize = await CustomCakeSize.findByPk(id);
      if(!customCakeSize) {
        return res.status(404).json({ message: "Custom cake size not found" })
      }
      await customCakeSize.destroy();
      return res.status(200).json({ message: "Custom cake size deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateCustomCakeSizeById(req, res, next) {
  const { id } = req.params;

  try {
    const customCakeSize = await CustomCakeSize.findByPk(id);

    if (!customCakeSize) {
      return res.status(404).json({
        message: "Custom cake size not found.",
      });
    }

    const {
      name_en,
      name_ar,
      custom_cake_type_id,
      slug,
      scoope_size,
      sort,
      calories,
      status,
    } = req.body;

    //  image handle (SAME LOGIC, CLEAR)
    let image_url = customCakeSize.image_url;

    if (req.file) {
      image_url = req.file.filename;
    }

    // update
    await customCakeSize.update({
      name_en: name_en ?? customCakeSize.name_en,
      name_ar: name_ar ?? customCakeSize.name_ar,
      custom_cake_type_id:
        custom_cake_type_id ?? customCakeSize.custom_cake_type_id,
      slug: slug ?? customCakeSize.slug,
      scoope_size: scoope_size ?? customCakeSize.scoope_size,
      sort: sort ?? customCakeSize.sort,
      calories: calories ?? customCakeSize.calories,
      status: status ?? customCakeSize.status,
    });

    // FINAL FIX — response mein UPDATED image use karo
    const responseData = {
      ...customCakeSize.toJSON(),
      image_url: image_url
        ? `${UPLOADS_URL}/${image_url}`
        : null,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
}


}
module.exports = CustomCakeSizeController;
