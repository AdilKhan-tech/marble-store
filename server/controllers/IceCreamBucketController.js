const IceCreamBucket = require('../models/IceCreamBucket');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class IceCreamBucketController {

    static async createIceCreamBucket(req, res) {
        try {
            const {name_en,name_ar,slug,size,price,calories,status} = req.body;

            const image_url = req.file?.path || null;
    
            const iceCreamBucket = await IceCreamBucket.create({
                name_en,
                name_ar,
                slug,
                size,
                price,
                calories,
                status,
                image_url
            });
            return res.status(201).json(iceCreamBucket);
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to create Ice Cream Bucket",
                error: error.message
            });
        }
    }

    // static async getAllIceCreamBucket(req, res) {
    //     try {
    //         const iceCreamBucket = await IceCreamBucket.findAll();
    //         res.status(200).json({iceCreamBucket})
    //     } catch(error) {
    //         res.status(500).json({message: "Failed to get Ice Cream Bucket", error: error.message});
    //     } 
    // }

    static async getAllIceCreamBucket(req, res) {
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
            "size",
            "price",
            "calories",
            "status",
          ];
    
          const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
          const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";
    
          const { count, rows } = await IceCreamBucket.findAndCountAll({
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
            message: "Failed to get Ice Cream Bucket",
            error: error.message,
          });
        }
    }

    static async updateIceCreamBucketById(req, res) {
        const { id } = req.params;
        try {
            const iceCreamBucket = await IceCreamBucket.findByPk(id);
            if (!iceCreamBucket) {
                return res.status(404).json({ message: "Ice Cream Bucket not found" });
            }
    
            const {
                name_en,
                name_ar,
                slug,
                size,
                price,
                calories,
                status,
            } = req.body;

            const image_url = req.file?.path || iceCreamBucket.image_url;
    
            await iceCreamBucket.update({
                name_en: name_en ?? iceCreamBucket.name_en,
                name_ar: name_ar ?? iceCreamBucket.name_ar,
                slug: slug ?? iceCreamBucket.slug,
                size: size ?? iceCreamBucket.size,
                price: price ?? iceCreamBucket.price,
                calories: calories ?? iceCreamBucket.calories,
                status: status ?? iceCreamBucket.status,
                image_url: image_url
            });

            return res.status(200).json(iceCreamBucket);
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Ice Cream Bucket",error: error.message});
        }
    }

    static async deleteIceCreamBucketById(req, res) {
        try {
            const { id } = req.params;
    
            const iceCreamBucket = await IceCreamBucket.findByPk(id);
    
            if (!iceCreamBucket) {
                return res.status(404).json({
                    message: "Ice Cream Bucket not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (iceCreamBucket.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", iceCreamBucket.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
    
            // Delete from database
            await iceCreamBucket.destroy();
    
            return res.status(200).json({
                message: "Ice Cream Bucket deleted successfully"
            });
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Ice Cream Bucket",
                error: error.message
            });
        }
    }
}
module.exports = IceCreamBucketController;