const CookieBoxType = require('../models/CookieBoxType');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CookieBoxTypeController {

    static async createCookieBoxType (req, res, next){
        try {
            const {name_en, name_ar, slug, sort, status} = req.body;

            const image_url = req.file?.path || null;

            const cookieBoxType = await CookieBoxType.create({
                name_en,
                name_ar,
                slug,
                sort,
                status,
                image_url,
            });
            return res.status(201).json(cookieBoxType);

        } catch(error) {
            next(error);
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

    static async updateCookieBoxTypeById(req, res, next) {
        const { id } = req.params;
        try {
            const cookieBoxType = await CookieBoxType.findByPk(id);
            if (!cookieBoxType) {
                return res.status(404).json({ message: "Cookies Types not found" });
            }
    
            const { name_en, name_ar, slug, sort, status } = req.body;

            const image_url = req.file?.path || cookieBoxType.image_url;
    
            await cookieBoxType.update({
                name_en: name_en ?? cookieBoxType.name_en,
                name_ar: name_ar ?? cookieBoxType.name_ar,
                slug: slug ?? cookieBoxType.slug,
                sort: sort ?? cookieBoxType.sort,
                status: status ?? cookieBoxType.status,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookies Types updated successfully",cookieBoxType});
    
        } catch (error) {
            next(error);
        }
    }

    static async deleteCookieBoxTypeById(req, res) {
        try {
            const { id } = req.params;
    
            const cookieBoxType = await CookieBoxType.findByPk(id);
    
            if (!cookieBoxType) {
                return res.status(404).json({
                    message: "Cookies Types not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookieBoxType.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookieBoxType.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookieBoxType.destroy();
    
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