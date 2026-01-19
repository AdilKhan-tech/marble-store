const { Category, Gender, Product, ProductBranch, ProductCategory, ProductOccasion } = require("../models");
const Branch = require("../models/Branch");
const Occasion = require("../models/Occasion");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");

class ProductController {

    static async createProduct(req, res) {
        try {
            const {
                name_en,
                name_ar,
                description,
                product_tag,
                gender_id,
                regular_price,
                sale_price,
                tax_status,
                tax_class,
                branch_ids,
                category_ids,
                occasion_ids
            } = req.body;

            const image_url = req.file?.path || null;

            const product = await Product.create({
                name_en,
                name_ar,
                description,
                product_tag,
                gender_id,
                regular_price,
                sale_price,
                tax_status,
                tax_class,
                image_url,
            });

            if (branch_ids && Array.isArray(branch_ids)) {
                const productBranches = branch_ids.map(branch_id => ({
                    product_id: product.id,
                    branch_id: branch_id,
                }));
                await ProductBranch.bulkCreate(productBranches);
            }

            if (category_ids && Array.isArray(category_ids)) {
                const productCategory = category_ids.map(category_id => ({
                    product_id: product.id,
                    category_id: category_id,
                }));
                await ProductCategory.bulkCreate(productCategory);
            }

            if (occasion_ids && Array.isArray(occasion_ids)) {
                const productOccasion = occasion_ids.map(occasion_id => ({
                    product_id: product.id,
                    occasion_id: occasion_id,
                }));
                await ProductOccasion.bulkCreate(productOccasion);
            }

            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create product", error: error.message });
        }
    }


    static async getAllProducts (req, res) {

        const { page, limit, offset } = getPagination(req);
        const { keywords, sortField, sortOrder } = req.query;
        try{

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
                "regular_price",
                "category_id",
                "date",
                "branches",
            ];

            const finalSortField = allowedSortFields.includes(sortField) ? sortField : "id";
            const finalSortOrder =sortOrder && sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

            const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            include: [
              {
                model: Gender,
                as: "productGender",
                attributes: ["id", "name_en", "name_ar"],
              },
              {
                model: Branch,
                as: "branches",
                attributes: ["id", "name_en", "name_ar"],
                through: { attributes: [] }
              },
              {
                model: Category,
                as: "categories",
                attributes: ["id", "name_en", "name_ar"],
                through: { attributes: [] }
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

        }catch (error) {
            return res.status(500).json({ message: "Failed to fetch Product", error: error.message });
        }
    }
    
    static async deleteProductById (req, res) {
        const { id} = req.params;
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "product not found" });
            }
            await product.destroy();
            return res.status(200).json({ message: "product deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getProductById (req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id, {
                include: [
                    {
                        model: Gender,
                        as: "productGender",
                        attributes: ["id", "name_en", "name_ar"],
                    },
                    {
                        model: Branch,
                        as: "branches",
                        attributes: ["id", "name_en", "name_ar"],
                    },
                    {
                        model: Category,
                        as: "categories",
                        attributes: ["id", "name_en", "name_ar"],
                    },
                    {
                        model: Occasion,
                        as: "occasions",
                        attributes: ["id", "name_en", "name_ar"],
                    },
                ],
            });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProductController;