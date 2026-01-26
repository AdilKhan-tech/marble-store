const IceCreamAddOn = require("../models/IceCreamAddOn");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class IceCreamAddOnController {
  static async createIceCreamAddOn(req, res, next) {
    try {
      const { name_en, name_ar, slug, type, status } = req.body;

      const image_url = req.file?.path || null;

      const iceCreamaddon = await IceCreamAddOn.create({
        name_en,
        name_ar,
        slug,
        type,
        status,
        image_url,
      });
      return res.status(201).json(iceCreamaddon);
    }catch (error) {
      next(error);
    }
  }

  static async getAllIceCreamAddOns(req, res) {
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
        "type",
        "status",
      ];

      const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
      const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const { count, rows } = await IceCreamAddOn.findAndCountAll({
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
        message: "Failed to retrieve IceCream AddOns",
        error: error.message,
      });
    }
  }

  static async updateIceCreamAddOnById(req, res, next) {
    const { id } = req.params;
    try {
      const iceCreamaddon = await IceCreamAddOn.findByPk(id);
      if(!iceCreamaddon) {
        return res.status(404).json({ message: "IceCream AddOn not found" });
      }

      const { name_en, name_ar, slug, type, status, } = req.body;

      const image_url = req.file?.path || iceCreamaddon.image_url;

      await iceCreamaddon.update({
        name_en: name_en ?? iceCreamaddon.name_en,
        name_ar: name_ar ?? iceCreamaddon.name_ar,
        slug: slug ?? iceCreamaddon.slug,
        type: type ?? iceCreamaddon.type,
        status: status ?? iceCreamaddon.status,
        image_url: image_url
      });

      return res.status(200).json({message: "IceCream AddOn updated successfully",iceCreamaddon});

    }catch (error) {
      next(error);
    }
  }

  static async deleteIceCreamAddOnById(req, res) {
    const { id } = req.params;
    try {
      const iceCreamaddon = await IceCreamAddOn.findByPk(id);
      if (!iceCreamaddon) {
        return res.status(404).json({ message: "IceCream AddOn not found" });
      }
      await iceCreamaddon.destroy();
      return res.status(200).json({ message: "IceCream AddOn deleted suucessfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = IceCreamAddOnController;
