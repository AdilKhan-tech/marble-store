const CustomCakeSize = require("../models/CustomCakeSize");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CustomCakeSizeController {
  static async createCustomCakeSize(req, res) {
    try {
      const {name_en,name_ar,cake_type_id,slug,portion_size,sort,calories,status,} = req.body;
      const image_url = req.file?.path || null;

      const customCakeSize = await CustomCakeSize.create({
        name_en,
        name_ar,
        cake_type_id,
        slug,
        portion_size,
        sort,
        calories,
        status,
        image_url,
      });
      return res.status(200).json(customCakeSize);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Failed to create Custom Cake Size",
          error: error.message,
        });
    }
  }

  static async getAllCustomCakeSize(req, res) {
    const { page, limit, offset } = getPagination(req);
    const { keywords } = req.query;
  
    try {
      const whereClause = {};
  
      if (keywords) {
        whereClause[Op.or] = [
          { name_en: { [Op.like]: `%${keywords}%` } },
          { name_ar: { [Op.like]: `%${keywords}%` } },
        ];
      }
  
      const { count, rows } = await CustomCakeSize.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [["id", "DESC"]],
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

  static async updateCustomCakeSizeById(req, res) {
    const { id } = req.params;
    try {
      const customCakeSize = await CustomCakeSize.findByPk(id);
      if (!customCakeSize) {
        return res.status(404).json({ message: "Custom cake size not found." });
      }
      const { name_en,name_ar,cake_type_id,slug,portion_size,sort,calories,status } = req.body;

      const image_url = req.file?.path || customCakeSize.image_url;

      await customCakeSize.update({
        name_en: name_en ?? customCakeSize.name_en,
        name_ar: name_ar ?? customCakeSize.name_ar,
        cake_type_id: cake_type_id ?? customCakeSize.cake_type_id,
        slug: slug ?? customCakeSize.slug,
        portion_size: portion_size ?? customCakeSize.portion_size,
        sort: sort ?? customCakeSize.sort,
        calories: calories ?? customCakeSize.calories,
        status: status ?? customCakeSize.status,
        image_url: image_url ?? customCakeSize.image_url,
      });
      return res.status(200).json({message: "Custom cake size updated successfully.",customCakeSize,});
    } catch (error) {
      return res.status(500).json({message: "Failed to update custom cake size",error: error.message,});
    }
  }

}
module.exports = CustomCakeSizeController;
