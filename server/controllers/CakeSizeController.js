const { CakeSize, CustomCakeTypes } = require("../models");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");


class CakeSizeController {

    static async createCakeSize(req, res) {
        try {
            const { name_en,name_ar,custom_cake_type_id,slug,scoop_size,additional_price,symbol,calories,status } = req.body

            const image_url = req.file?.path || null;
            
            const cakesizes = await CakeSize.create({
                name_en,
                name_ar,
                custom_cake_type_id,
                slug,
                scoop_size,
                additional_price,
                symbol,
                calories,
                status,
                image_url,
            });
            return res.status(201).json(cakesizes);
        } catch (err) {
            return res.status(500).json({ message: "Failed to create cake size", error: err.message });
        }
    }

    static async getAllCakeSizes(req, res) {
        const { page, limit, offset } = getPagination(req);
        const { keywords } = req.query;
      
        try {
          const whereClause = {};
      
          if (keywords) {
            whereClause.name_en = {
              [Op.like]: `%${keywords}%`,
            };
          }
      
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
          return res.status(500).json({ message: "Failed to get cake sizes",error: error.message });
        }
      }
      
      

    static async updateCakeSizeById(req, res) {
        const { id } = req.params;
        try {
            const cakesizes = await CakeSize.findByPk(id);
            if (!cakesizes) {
                return res.status(404).json({ message: "Cake size not found" });
            }
            const {
                custom_cake_type_id,
                name_en,
                name_ar,
                slug,
                scoop_size,
                additional_price,
                symbol,
                calories,
                status
            } = req.body;

            const image_url = req.file?.path || cakesizes.image_url;

            await cakesizes.update({
                name_en: name_en ?? cakesizes.name_en,
                name_ar: name_ar ?? cakesizes.name_ar,
                custom_cake_type_id: custom_cake_type_id ?? cakesizes.custom_cake_type_id,
                slug: slug ?? cakesizes.slug,
                scoop_size: scoop_size ?? cakesizes.scoop_size,
                additional_price: additional_price ?? cakesizes.additional_price,
                symbol: symbol ?? cakesizes.symbol,
                calories: calories ?? cakesizes.calories,
                status: status ?? cakesizes.status,
                image_url: image_url
            });
    
            return res.status(200).json({
                message: "Cake size updated successfully",
                cakesizes
            });
    
        } catch (error) {
            return res.status(500).json({ message: "Failed to update cake size", error: error.message });
        }
    }

    static async deleteCakeSizeById(req, res) {
        try {
            const { id } = req.params;
            const cakesizes = await CakeSize.findByPk(id);
            if(!cakesizes) {
                return res.status(404).json({ message: "Cake size not found" });
            }
            await cakesizes.destroy();
            return res.status(200).json({ message: "Cake size deleted successfully" });     
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
module.exports = CakeSizeController;