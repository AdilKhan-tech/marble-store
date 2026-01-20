const CustomCakeType = require("../models/CustomCakeType");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CustomCakeTypeController {

  static async createCustomCakeType (req, res){
    try {
        const {name_en, name_ar, slug, status} = req.body;

        const image_url = req.file?.path || null;

        const customCakeTypes = await CustomCakeType.create({
            name_en,
            name_ar,
            slug,
            status,
            image_url,
        });
        return res.status(201).json(customCakeTypes);

    } catch(error) {
        return res.status(500).json({
            message: "Failed to create Cookies",
            error: error.message
        });
    }
  }

  static async getAllCustomCakeTypes(req, res) {
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
        "status",
      ];
  
      const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
  
      const { count, rows } = await CustomCakeType.findAndCountAll({
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
        message: "Failed to retrieve custom cake types",
        error: error.message,
      });
    }
  }
  


  static async updateCustomCakeTypeById(req, res) {
    const { id } = req.params;
  
    try {
      const customCakeTypes = await CustomCakeType.findByPk(id);
  
      if (!customCakeTypes) {
        return res.status(404).json({ message: "Custom Cake Type not found" });
      }
  
      const { name_en, name_ar, slug, status } = req.body;
  
      const image_url = req.file?.path || customCakeTypes.image_url;
  
      await customCakeTypes.update({
        name_en: name_en ?? customCakeTypes.name_en,
        name_ar: name_ar ?? customCakeTypes.name_ar,
        slug: slug ?? customCakeTypes.slug,
        status: status ?? customCakeTypes.status,
        image_url,
      });
  
      return res.status(200).json({
        message: "Custom Cake Type updated successfully",
        customCakeTypes,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update Custom Cake Type",
        error: error.message,
      });
    }
  }
  

  static async deleteCustomCakeTypeById(req, res) {
    const { id } = req.params;
    try {
      const customcaketypes = await CustomCakeType.findByPk(id);
      if (!customcaketypes) {
        return res.status(404).json({ message: "Custom cake type not found" });
      }
      await customcaketypes.destroy();
      return res.status(200).json({ message: "Custom cake type deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CustomCakeTypeController;
