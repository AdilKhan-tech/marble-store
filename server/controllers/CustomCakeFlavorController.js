const { CustomCakeFlavor, CustomCakeTypes} = require("../models");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CustomCakeFlavorController {

  static async createCustomCakeFlavor(req, res) {
    try {
      const { name_en, name_ar, custom_cake_type_id, slug, status } = req.body;

      const image_url = req.file?.path || null;

      const customCakeFlavor = await CustomCakeFlavor.create({
        name_en,
        name_ar,
        custom_cake_type_id,
        slug,
        status,
        image_url,
      });
      return res.status(200).json(customCakeFlavor);
    } catch (error) {
      return res.status(500).json({message: "Failed to create Custom Cake Flavor",error: error.message,});
    }
  }

  static async getAllCustomCakeFlavor(req, res) {
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
        "status",
        "custom_cake_type_id",
      ];

      const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const { count, rows } = await CustomCakeFlavor.findAndCountAll({
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
        message: "Failed to get Custom Cake Flavor",
        error: error.message,
      });
    }
  }

  static async updateCustomCakeFlavorById(req, res) {
    const { id } = req.params;
    try {
        const customCakeFlavor = await CustomCakeFlavor.findByPk(id);
        if (!customCakeFlavor) {
            return res.status(404).json({ message: "Cake size not found" });
        }
        const {
            name_en,
            name_ar,
            custom_cake_type_id,
            slug,
            status
        } = req.body;

        const image_url = req.file?.path || customCakeFlavor.image_url;

        await customCakeFlavor.update({
          name_en: name_en ?? customCakeFlavor.name_en,
          name_ar: name_ar ?? customCakeFlavor.name_ar,
          custom_cake_type_id: custom_cake_type_id ?? customCakeFlavor.custom_cake_type_id,
          slug: slug ?? customCakeFlavor.slug,
          status: status ?? customCakeFlavor.status,
          image_url: image_url
        });

        return res.status(200).json({
            message: "custom cake flavor updated successfully",
            customCakeFlavor
        });

    } catch (error) {
      return res.status(500).json({ message: "Failed to update custom cake flavor", error: error.message });
    }
  }

  static async deleteCustomCakeFlavorById(req, res) {
    try {
      const { id } = req.params;
      const customCakeFlavor = await CustomCakeFlavor.findByPk(id);
      if(!customCakeFlavor) {
        return res.status(404).json({ message: "Cake size not found" });
      }
      await customCakeFlavor.destroy();
      return res.status(200).json({ message: "Custom Cake Flavor Deleted successfully" });     
    }
    catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
module.exports = CustomCakeFlavorController;
