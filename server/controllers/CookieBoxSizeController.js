const {CookieBoxSize, CookieBoxType } = require ("../models")
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class CookieBoxSizeController {
    
    static async createCookieBoxSize (req, res) {
        try {
            const {name_en, name_ar, cookies_types_id, slug, portion_size, price, symbol, calories, status} = req.body;

            const image_url = req.file?.path || null;

            const cookiesBoxSize = await CookieBoxSize.create({
                name_en,
                name_ar,
                cookies_types_id,
                slug,
                portion_size,
                price,
                symbol,
                calories,
                status,
                image_url,
            })

            return res.status(201).json(cookiesBoxSize);
        } catch(error) {
            return res.status(500).json({
                message: "Failed to create Cookies Box Size",
                error: error.message
            });
        }
    }

    static async getAllCookieBoxSizes(req, res) {
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
                "portion_size",
                "price",
                "status",
                "cookies_types_id",
            ];

            const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
            const finalSortOrder = sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

            const { count, rows } = await CookieBoxSize.findAndCountAll({
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
                message: "Failed to fetch Cookies Box Sizes",
                error: error.message
            });
        }
    }

    static async updateCookieBoxSizeById(req, res) {
        const { id } = req.params;
        try {
            const cookiesBoxSize = await CookieBoxSize.findByPk(id);
            if (!cookiesBoxSize) {
                return res.status(404).json({ message: "Cookies box size not found" });
            }
    
            const {
                name_en,
                name_ar,
                cookies_types_id,
                slug,
                portion_size,
                price,
                symbol,
                calories,
                status,
            } = req.body;

            const image_url = req.file?.path || cookiesBoxSize.image_url;
    
            await cookiesBoxSize.update({
                name_en: name_en ?? cookiesBoxSize.name_en,
                name_ar: name_ar ?? cookiesBoxSize.name_ar,
                cookies_types_id: cookies_types_id ?? cookiesBoxSize.cookies_types_id,
                slug: slug ?? cookiesBoxSize.slug,
                portion_size: portion_size ?? cookiesBoxSize.portion_size,
                price: price ?? cookiesBoxSize.price,
                symbol: symbol ?? cookiesBoxSize.symbol,
                calories: calories ?? cookiesBoxSize.calories,
                status: status ?? cookiesBoxSize.status,
                image_url: image_url
            });

            return res.status(200).json({message: "Cookies box size updated successfully",cookiesBoxSize});
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Cookies box size",error: error.message});
        }
    }

    static async deleteCookieBoxSizeById(req, res) {
        try {
            const { id } = req.params;
    
            const cookiesBoxSize = await CookieBoxSize.findByPk(id);
    
            if (!cookiesBoxSize) {
                return res.status(404).json({
                    message: "Cookies box size not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (cookiesBoxSize.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", cookiesBoxSize.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await cookiesBoxSize.destroy();
    
            return res.status(200).json({message: "Cookies box size deleted successfully"});
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Cookies box size",
                error: error.message
            });
        }
    }
}

module.exports = CookieBoxSizeController;