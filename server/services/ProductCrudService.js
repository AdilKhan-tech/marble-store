const {Product,ProductTag,ProductBranch,ProductCategory,ProductOccasion} = require("../models");
const CustomError = require("../exceptions/CustomError");
const { UPLOADS_URL } = require("../config/config");

class ProductCrudService {
  static async createProduct(data) {
    const {
      name_en,
      name_ar,
      description,
      gender_id,
      regular_price,
      sale_price,
      tax_status,
      tax_class,
      tag_ids = [],
      branch_ids = [],
      category_ids = [],
      occasion_ids = [],
      image_url,
    } = data;

    try {
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

      if (tag_ids.length) {
        await ProductTag.bulkCreate(
          tag_ids.map((tag_id) => ({ product_id: product.id, tag_id })),
        );
      }
      if (branch_ids.length) {
        await ProductBranch.bulkCreate(
          branch_ids.map((branch_id) => ({
            product_id: product.id,
            branch_id,
          })),
        );
      }
      if (category_ids.length) {
        await ProductCategory.bulkCreate(
          category_ids.map((category_id) => ({
            product_id: product.id,
            category_id,
          })),
        );
      }
      if (occasion_ids.length) {
        await ProductOccasion.bulkCreate(
          occasion_ids.map((occasion_id) => ({
            product_id: product.id,
            occasion_id,
          })),
        );
      }

      return {
        ...product.toJSON(),
        image_url: product.image_url
          ? `${UPLOADS_URL}/${product.image_url}`
          : null,
      };
    } catch (error) {
      throw CustomError.internal(error.message);
    }
  }

  static async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) throw CustomError.notFound("Product not found");

    const {
      name_en,
      name_ar,
      description,
      gender_id,
      regular_price,
      sale_price,
      tax_status,
      tax_class,
      tag_ids = [],
      branch_ids = [],
      category_ids = [],
      occasion_ids = [],
      image_url,
    } = data;

    try {
      await product.update({
        name_en,
        name_ar,
        description,
        gender_id,
        regular_price,
        sale_price,
        tax_status,
        tax_class,
        image_url: image_url || product.image_url,
      });

      // Clear old associations
      await Promise.all([
        ProductTag.destroy({ where: { product_id: id } }),
        ProductBranch.destroy({ where: { product_id: id } }),
        ProductCategory.destroy({ where: { product_id: id } }),
        ProductOccasion.destroy({ where: { product_id: id } }),
      ]);

      // Create new associations
      if (tag_ids.length)
        await ProductTag.bulkCreate(
          tag_ids.map((tag_id) => ({ product_id: id, tag_id })),
        );
      if (branch_ids.length)
        await ProductBranch.bulkCreate(
          branch_ids.map((branch_id) => ({ product_id: id, branch_id })),
        );
      if (category_ids.length)
        await ProductCategory.bulkCreate(
          category_ids.map((category_id) => ({ product_id: id, category_id })),
        );
      if (occasion_ids.length)
        await ProductOccasion.bulkCreate(
          occasion_ids.map((occasion_id) => ({ product_id: id, occasion_id })),
        );

      return {
        ...product.toJSON(),
        image_url: product.image_url
          ? `${UPLOADS_URL}/${product.image_url}`
          : null,
      };
    } catch (error) {
      throw CustomError.internal(error.message);
    }
  }

  static async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw CustomError.notFound("Product not found");

    try {
      await product.destroy();
      return { message: "Product deleted successfully" };
    } catch (error) {
      throw CustomError.internal(error.message);
    }
  }
}

module.exports = ProductCrudService;
