const Product = require ("../models/Product");

class ProductController {

    static async createProduct (req, res) {
        try{
            const { name_en, name_ar,description, Product_category_id, Product_branch_id,Product_tag, cookie_box_type_id, cookie_box_size_id, cookies_id, occasions_id, genders_id, icecream_bucket_id, icecream_addons_id, cake_portion_size_id, cake_size_id, cake_flavor_id, custom_cake_type_id, custom_cake_size_id, custom_cake_flavor_id, regular_price, sale_price, tax_status, tax_class } = req.body;

            const image_url = req.file?.path || null;
            
            const product = await Product.create(
                name_en,
                name_ar,
                description,
                Product_category_id,
                Product_branch_id,
                Product_tag,
                cookie_box_type_id,
                cookie_box_size_id,
                cookies_id,
                occasions_id,
                genders_id,
                icecream_bucket_id,
                icecream_addons_id,
                cake_portion_size_id,
                cake_size_id,
                cake_flavor_id,
                custom_cake_type_id,
                custom_cake_size_id,
                custom_cake_flavor_id,
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
            const product = await Product.findAll();
            return res.status(200).json(product)

        }catch (error) {
            return res.status(500).json({ message: "Failed to fetch Product", error: error.message });
        }
    }

}

module.exports = ProductController;