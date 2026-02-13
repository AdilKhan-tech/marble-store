const { Category, Gender, Product, Tag, ProductTag, ProductBranch, ProductCategory, ProductOccasion } = require("../models");
const Common = require("../utils/Common");
const Branch = require("../models/Branch");
const Occasion = require("../models/Occasion");
const getPagination = require("../utils/pagination");
const { Op } = require("sequelize");
const { UPLOADS_URL } = require("../config/config");

class ProductController {

    static async createProduct(req, res) {
        try {
            const {
                name_en,
                name_ar,
                description,
                tag_ids,
                gender_id,
                regular_price,
                sale_price,
                tax_status,
                tax_class,
                branch_ids,
                category_ids,
                occasion_ids
            } = req.body;
    
            const image_url = req.file ? req.file.filename : null;
    
            const product = await Product.create({
                name_en,
                name_ar,
                description,
                gender_id,
                regular_price,
                sale_price,
                tax_status,
                tax_class,
                image_url,
            });
    
            // normalize ids
            const tags = Common.normalizeToArray(tag_ids);
            const branches = Common.normalizeToArray(branch_ids);
            const categories = Common.normalizeToArray(category_ids);
            const occasions = Common.normalizeToArray(occasion_ids);

    
            if (tags.length) {
                await ProductTag.bulkCreate(
                    tags.map(tag_id => ({
                        product_id: product.id,
                        tag_id
                    }))
                );
            }
    
            if (branches.length) {
                await ProductBranch.bulkCreate(
                    branches.map(branch_id => ({
                        product_id: product.id,
                        branch_id
                    }))
                );
            }
    
            if (categories.length) {
                await ProductCategory.bulkCreate(
                    categories.map(category_id => ({
                        product_id: product.id,
                        category_id
                    }))
                );
            }
    
            if (occasions.length) {
                await ProductOccasion.bulkCreate(
                    occasions.map(occasion_id => ({
                        product_id: product.id,
                        occasion_id
                    }))
                );
            }

            return res.status(201).json({
                ...product.toJSON(),
                image_url: product.image_url
                  ? `${UPLOADS_URL}/${product.image_url}`
                  : null,
              });

        } catch (error) {
            return res.status(500).json({
                message: "Failed to create product",
                error: error.message
            });
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
                    model: Tag,
                    as: "tags",
                    attributes: ["id", "name_en", "name_ar"],
                },
                {
                    model: Gender,
                    as: "gender",
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
            limit,
            offset,
            distinct: true,
            order: [[finalSortField, finalSortOrder]],
          });
            
            const data = rows.map(item => {
                const product = item.toJSON();
                return {
                ...product,
                image_url: product.image_url
                    ? `${UPLOADS_URL}/${product.image_url}`
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
                        as: "gender",
                        attributes: ["id", "name_en", "name_ar"],
                    },
                    {
                        model: Tag,
                        as: "tags",
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
                    {
                        model: Tag,
                        as: "tags",
                        attributes: ["id", "name_en", "name_ar"],
                    },
                ],
            });
            const responseData = {
            ...product.toJSON(),
            image_url: product.image_url
              ? `${UPLOADS_URL}/${product.image_url}`
              : null,
          };
            return res.status(200).json(responseData);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async updateProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).json({ message: "Product not found" });

            const {
                name_en,
                name_ar,
                description,
                tag_ids,
                gender_id,
                regular_price,
                sale_price,
                tax_status,
                tax_class,
                branch_ids,
                category_ids,
                occasion_ids
            } = req.body;

            let image_url = product.image_url;
            if (req.file) {
                image_url = req.file.filename;
            }

            await product.update({
                name_en, name_ar, description, gender_id, regular_price,
                sale_price, tax_status, tax_class, image_url
            });

            // normalize ids
            const tags = Common.normalizeToArray(tag_ids);
            const branches = Common.normalizeToArray(branch_ids);
            const categories = Common.normalizeToArray(category_ids);
            const occasions = Common.normalizeToArray(occasion_ids);

            if (tags.length) await ProductTag.destroy({ where: { product_id: id } });
            if (branches.length) await ProductBranch.destroy({ where: { product_id: id } });
            if (categories.length) await ProductCategory.destroy({ where: { product_id: id } });
            if (occasions.length) await ProductOccasion.destroy({ where: { product_id: id } });

            if (tags.length) await ProductTag.bulkCreate(tags.map(tag_id => ({ product_id: id, tag_id })));
            if (branches.length) await ProductBranch.bulkCreate(branches.map(branch_id => ({ product_id: id, branch_id })));
            if (categories.length) await ProductCategory.bulkCreate(categories.map(category_id => ({ product_id: id, category_id })));
            if (occasions.length) await ProductOccasion.bulkCreate(occasions.map(occasion_id => ({ product_id: id, occasion_id })));

            const responseData = {
            ...product.toJSON(),
            image_url: product.image_url
              ? `${UPLOADS_URL}/${product.image_url}`
              : null,
          };
            return res.status(200).json(responseData);
        } catch (error) {
            return res.status(500).json({ message: "Failed to update product", error: error.message });
        }
    }

}

module.exports = ProductController;