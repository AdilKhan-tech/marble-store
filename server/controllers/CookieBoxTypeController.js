const CookieBoxType = require('../models/CookieBoxType');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CookieBoxTypeController {

    static async createCookieBoxType (req, res){
        try {
            const {name_en, name_ar, slug, sort, status} = req.body;

            const image_url = req.file?.path || null;

            const cookiesTypes = await CookieBoxType.create({
                name_en,
                name_ar,
                slug,
                sort,
                status,
                image_url,
            });
            return res.status(201).json(cookiesTypes);

        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies Types",
                error: error.message
            });
        }
    }

    static async getAllCookieBoxTypes(req, res) {
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
                "sort",
                "status",
            ];

            const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
            const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

            const { count, rows } = await CookieBoxType.findAndCountAll({
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
                message: "Failed to fetch Cookies Types",
                error: error.message
            });
        }
    }

    static async updateCookieBoxTypeById(req, res) {
        const { id } = req.params;
        try {
            const cookiesTypes = await CookieBoxType.findByPk(id);
            if (!cookiesTypes) {
                return res.status(404).json({ message: "Cookies Types not found" });
            }
    
            const { name_en, name_ar, slug, sort, status } = req.body;

            const image_url = req.file?.path || cookiesTypes.image_url;
    
            await cookiesTypes.update({
                name_en: name_en ?? cookiesTypes.name_en,
                name_ar: name_ar ?? cookiesTypes.name_ar,
                slug: slug ?? cookiesTypes.slug,
                sort: sort ?? cookiesTypes.sort,
                status: status ?? cookiesTypes.status,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookies Types updated successfully",cookiesTypes});
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Cookies Types",error: error.message});
        }
    }

    static async deleteCookieBoxTypeById(req, res) {
        try {
            const { id } = req.params;
    
            const cookiesTypes = await CookieBoxType.findByPk(id);
    
            if (!cookiesTypes) {
                return res.status(404).json({
                    message: "Cookies Types not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookiesTypes.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookiesTypes.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookiesTypes.destroy();
    
            return res.status(200).json({message: "Cookies Types deleted successfully"});
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Cookies Types",
                error: error.message
            });
        }
    }
    
}
module.exports = CookieBoxTypeController;    