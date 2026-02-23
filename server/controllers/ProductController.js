const ProductCrudService = require("../services/ProductCrudService");
const {Product,Tag,Gender,Branch,Category,Occasion,} = require("../models");
const getPagination = require("../utils/pagination");
const { UPLOADS_URL } = require("../config/config");
const ProductQueryService = require("../services/ProductQueryService");

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const product = await ProductCrudService.createProduct({
        ...req.body,
        image_url: req.file ? req.file.filename : null,
      });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async updateProductById(req, res, next) {
    try {
      const product = await ProductCrudService.updateProduct(req.params.id, {
        ...req.body,
        image_url: req.file ? req.file.filename : null,
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const result = await ProductCrudService.deleteProduct(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllProducts(req, res, next) {
    const { page, limit, offset } = getPagination(req);
    try {
      const result = await ProductQueryService.getAll({
        page,
        limit,
        offset,
        query: req.query,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: Tag, as: "tags", attributes: ["id", "name_en", "name_ar"] },
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
      });
      if (!product) throw new Error("Product not found");
      res.status(200).json({
        ...product.toJSON(),
        image_url: product.image_url
          ? `${UPLOADS_URL}/${product.image_url}`
          : null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
