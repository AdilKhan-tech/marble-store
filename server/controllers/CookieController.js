const { Cookie, CookieBoxType } = require('../models');
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CookieController {

    static async createCookie (req, res){
        try {
            const {name_en, name_ar, cookie_type_id, slug, sort, status} = req.body;

            const image_url = req.file?.path || null;

            const cookie = await Cookie.create({
                name_en,
                name_ar,
                cookie_type_id,
                slug,
                sort,
                status,
                image_url,
            });
            return res.status(201).json(cookie);

        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookie",
                error: error.message
            });
        }
    }

    static async getAllCookies(req, res) {
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
                "cookie_type_id",
            ];

            const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
            const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

            const { count, rows } = await Cookie.findAndCountAll({
                where: whereClause,
                include: [
                    {
                        model: CookieBoxType,
                        as: "type",
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
                message: "Failed to fetch Cookies",
                error: error.message
            });
        }
    }

    static async updateCookieById(req, res) {
        const { id } = req.params;
        try {
            const cookie = await Cookie.findByPk(id);
            if (!cookie) {
                return res.status(404).json({ message: "Cookie not found" });
            }
    
            const {
                name_en,
                name_ar,
                cookie_type_id,
                slug,
                sort,
                status
            } = req.body;

            const image_url = req.file?.path || cookie.image_url;
    
            await cookie.update({
                name_en: name_en ?? cookie.name_en,
                name_ar: name_ar ?? cookie.name_ar,
                cookie_type_id: cookie_type_id ?? cookie.cookie_type_id,
                slug: slug ?? cookie.slug,
                sort: sort ?? cookie.sort,
                status: status ?? cookie.status,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookie updated successfully",cookie});
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Cookie",error: error.message});
        }
    }

    static async deleteCookieById(req, res) {
        try {
            const { id } = req.params;
    
            const cookie = await Cookie.findByPk(id);
    
            if (!cookie) {
                return res.status(404).json({
                    message: "Cookie not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookie.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookie.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookie.destroy();
    
            return res.status(200).json({message: "Cookie deleted successfully"});
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Cookie",
                error: error.message
            });
        }
    }
    
}
module.exports = CookieController;    