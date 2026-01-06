const { Category, Gender, Product, ProductBranch } = require("../models");
const Branch = require("../models/Branch");

class ProductController {

    static async createProduct(req, res) {
    try {
        const {
            name_en, name_ar, description,
            product_category_id, product_branch_id, product_branch_ids,
            product_tag, occasions_id, genders_id,
            regular_price, sale_price, tax_status, tax_class
        } = req.body;

        const image_url = req.file?.path || null;

        const product = await Product.create({
            name_en, name_ar, description,
            product_category_id, product_branch_id,
            product_tag, occasions_id, genders_id,
            regular_price, sale_price, tax_status, tax_class,
            image_url
        });

        if (Array.isArray(product_branch_ids) && product_branch_ids.length > 0) {
            const branchesToInsert = product_branch_ids.map(branch_id => ({
                product_id: product.id,
                branch_id
            }));
            await ProductBranch.bulkCreate(branchesToInsert);
        }

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Failed to create product", error: error.message });
    }
}

    static async getAllProducts (req, res) {
        try{
            const product = await Product.findAll({
            include: [
              {
                model: Gender,
                as: "productGender",
                attributes: ["id", "name_en", "name_ar"],
              },
              {
                model: Branch,
                as: "productBranch",
                attributes: ["id", "name_en", "name_ar"],
              },
              {
                model: Category,
                as: "productCategory",
                attributes: ["id", "name_en", "name_ar"],
              }
            ],
          });
            return res.status(200).json(product)

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

}

module.exports = ProductController;