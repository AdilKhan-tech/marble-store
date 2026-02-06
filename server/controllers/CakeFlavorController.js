const {CakeFlavor, Category} = require('../models');
const { UPLOADS_URL } = require("../config/config")
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CakeFlavorController {
    
    static async createCakeFlavor(req, res, next) {
       try {
        const { name_en, name_ar, cake_category_id, slug, additional_price, symbol, status } = req.body
         const image_url = req.file ? req.file.filename : null;

        const cakeFlavor = await CakeFlavor.create({
            name_en,
            name_ar,
            cake_category_id,
            slug,
            additional_price,
            symbol,
            status,
            image_url,
        });
        
       const responseData = {
             ...cakeFlavor.toJSON(),
             image_url: cakeFlavor.image_url
               ? `${UPLOADS_URL}/${cakeFlavor.image_url}` 
               : null,
       };
           return res.status(201).json(responseData)
        } catch (error) {
          next(error);
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
          "cake_category_id"
        ];
  
        const finalSortField = allowedSortFields.includes(sortField)
          ? sortField
          : "id";
  
        const finalSortOrder =
          sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
        
        const cakeParent = await Category.findOne({
          where: { slug: "Cakes" }, // ya name_en: "Cake"
          attributes: ["id"],
        });
          const cakeParentId = cakeParent ? cakeParent.id : null;
  
        const { count, rows } = await CakeFlavor.findAndCountAll({
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
        // 🔥 IMAGE URL BUILD HERE
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
          message: "Failed to get cake flavors",
          error: error.message
        });
      }
    }

    static async updateCakeFlavorById(req, res, next) {
        const { id } = req.params;
        try {
            const cakeFlavor = await CakeFlavor.findByPk(id);
            if (!cakeFlavor) {
                return res.status(404).json({ message: "Cake flavor not found" });
            }
            const {name_en,name_ar,cake_category_id,slug,additional_price,symbol,status} = req.body;

          // ✅ IMPORTANT: image ko overwrite mat karo agar new image nahi aayi
            let image_url = cakeFlavor.image_url;
          if (req.file) {
            image_url = req.file.filename;
          }

            await cakeFlavor.update({
                name_en: name_en ?? cakeFlavor.name_en,
                name_ar: name_ar ?? cakeFlavor.name_ar,
                cake_category_id: cake_category_id ?? cakeFlavor.cake_category_id,
                slug: slug ?? cakeFlavor.slug,
                additional_price: additional_price ?? cakeFlavor.additional_price,
                symbol: symbol ?? cakeFlavor.symbol,
                status: status ?? cakeFlavor.status,
                image_url: image_url
            });
          
            // 🔥 BUILD FULL IMAGE URL FOR FRONTEND
          const responseData = {
            ...cakeFlavor.toJSON(),
            image_url: cakeFlavor.image_url
              ? `${UPLOADS_URL}/${cakeFlavor.image_url}`
              : null,
          };
            return res.status(200).json(responseData);
    
        }catch (error) {
          next(error);
        }
    }

    static async deleteCakeFlavorById(req,res) {
        const { id } = req.params; 
        try {
            const cakeFlavor = await CakeFlavor.findByPk(id);
            if (!cakeFlavor) {
                return res.status(404).json({ message: "Cake flavor not found" });
            }
            await cakeFlavor.destroy();
            return res.status(200).json({ message: "Cake flavor deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
module.exports = CakeFlavorController;