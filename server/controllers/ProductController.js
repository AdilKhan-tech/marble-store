const {Category, Gender , Product} = require ("../models");

class ProductController {

    static async createProduct (req, res) {
        try{
            const { name_en, name_ar,description, Product_category_id, Product_branch_id,Product_tag, occasions_id, genders_id, regular_price, sale_price, tax_status, tax_class } = req.body;

            const image_url = req.file?.path || null;
            
            const product = await Product.create(
                name_en,
                name_ar,
                description,
                Product_category_id,
                Product_branch_id,
                Product_tag,
                occasions_id,
                genders_id,
                regular_price,
                sale_price,
                tax_status,
                tax_class,
                image_url,
            );
            return res.status(201).json(product);
        }
        catch (error) {
            res.status(500).json({message: "Failed to create product", error: error.message});
        }
    }

    static async getAllProducts (req, res) {
        try{
            const product = await Product.findAll({

            include: [
              {
                model: Category,
                as: "productCategory",
                attributes: ["id", "name_en", "name_ar"],
              },
            ],

            include: [
              {
                model: Gender,
                as: "productGender",
                attributes: ["id", "name_en", "name_ar"],
              },
            ],
          });
            return res.status(200).json(product)

        }catch (error) {
            return res.status(500).json({ message: "Failed to fetch Product", error: error.message });
        }
    }

}

module.exports = ProductController;