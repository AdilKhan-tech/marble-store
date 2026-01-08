const {CakeFlavor, CustomCakeTypes} = require('../models');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CakeFlavorController {
    
    static async createCakeFlavor(req, res) {
       try {
        const { name_en, name_ar, custom_cake_type_id, slug, additional_price, symbol, status } = req.body

        const image_url = req.file?.path || null;

        const cakeflavors = await CakeFlavor.create({
            name_en,
            name_ar,
            custom_cake_type_id,
            slug,
            additional_price,
            symbol,
            status,
            image_url,
        });
        
        return res.status(201).json(cakeflavors);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create cake flavor", error: error.message});
        }
    }

    static async getAllCakeFlavors(req, res) {

      const { page, limit, offset } = getPagination(req);
      const { keywords, sortField, sortOrder } = req.query;
  
      try {
  
        const whereClause = {};
  
        if (keywords) {
          whereClause[Op.or] = [
            { name_en: { [Op.like]: `%${keywords}%` } },
            { name_ar: { [Op.like]: `%${keywords}%` } },
            { symbol: { [Op.like]: `%${keywords}%` } },
          ];
        }
  
        const allowedSortFields = [
          "id",
          "name_en",
          "additional_price",
          "status",
          "custom_cake_type_id"
        ];
  
        const finalSortField = allowedSortFields.includes(sortField)
          ? sortField
          : "id";
  
        const finalSortOrder =
          sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
  
        const { count, rows } = await CakeFlavor.findAndCountAll({
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
          message: "Failed to get cake flavors",
          error: error.message
        });
      }
    }

    static async updateCakeFlavorById(req, res) {
        const { id } = req.params;
        try {
            const cakeflavors = await CakeFlavor.findByPk(id);
            if (!cakeflavors) {
                return res.status(404).json({ message: "Cake flavor not found" });
            }
            const {name_en,name_ar,custom_cake_type_id,slug,additional_price,symbol,status} = req.body;

            const image_url = req.file?.path || cakeflavors.image_url;

            await cakeflavors.update({
                name_en: name_en ?? cakeflavors.name_en,
                name_ar: name_ar ?? cakeflavors.name_ar,
                custom_cake_type_id: custom_cake_type_id ?? cakeflavors.custom_cake_type_id,
                slug: slug ?? cakeflavors.slug,
                additional_price: additional_price ?? cakeflavors.additional_price,
                symbol: symbol ?? cakeflavors.symbol,
                status: status ?? cakeflavors.status,
                image_url: image_url
            });
    
            return res.status(200).json({
                message: "Cake flavor updated successfully",
                cakeflavors
            });
    
        } catch (error) {
            return res.status(500).json({ message: "Failed to update cake flavor", error: error.message });
        }
    }

    static async deleteCakeFlavorById(req,res) {
        const { id } = req.params; 
        try {
            const cakeflavors = await CakeFlavor.findByPk(id);
            if (!cakeflavors) {
                return res.status(404).json({ message: "Cake flavor not found" });
            }
            await cakeflavors.destroy();
            return res.status(200).json({ message: "Cake flavor deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = CakeFlavorController;