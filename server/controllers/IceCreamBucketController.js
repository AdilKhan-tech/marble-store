const IceCreamBucket = require('../models/IceCreamBucket');

class IceCreamBucketController {

    static async createIceCreamBucket(req, res) {
        try {
            const {name_en,name_ar,slug,size,price,symbol,calories,status} = req.body;

            const image_url = req.file?.path || null;
    
            const iceCreamBucket = await IceCreamBucket.create({
                name_en,
                name_ar,
                slug,
                size,
                price,
                symbol,
                calories,
                status,
                image_url
            });
            return res.status(201).json(iceCreamBucket);
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to create Ice Cream Bucket",
                error: error.message
            });
        }
    }

    static async getAllIceCreamBucket(req, res) {
        try {
            const iceCreamBucket = await IceCreamBucket.findAll();
            res.status(200).json({iceCreamBucket})
        } catch(error) {
            res.status(500).json({message: "Failed to get Ice Cream Bucket", error: error.message});
        } 
    }

    static async updateIceCreamBucketById(req, res) {
        const { id } = req.params;
        try {
            const iceCreamBucket = await IceCreamBucket.findByPk(id);
            if (!iceCreamBucket) {
                return res.status(404).json({ message: "Ice Cream Bucket not found" });
            }
    
            const {
                name_en,
                name_ar,
                slug,
                size,
                price,
                symbol,
                calories,
                status,
            } = req.body;

            const image_url = req.file?.path || iceCreamBucket.image_url;
    
            let parsedStatus = iceCreamBucket.status;
    
            if (status !== undefined) {
                if (status === 'true' || status === true || status === '1' || status === 1) {
                    parsedStatus = true;
                }
                else if (status === 'false' || status === false || status === '0' || status === 0) {
                    parsedStatus = false;
                }
            }
    
            await iceCreamBucket.update({
                name_en: name_en ?? iceCreamBucket.name_en,
                name_ar: name_ar ?? iceCreamBucket.name_ar,
                slug: slug ?? iceCreamBucket.slug,
                size: size ?? iceCreamBucket.size,
                price: price ?? iceCreamBucket.price,
                symbol: symbol ?? iceCreamBucket.symbol,
                calories: calories ?? iceCreamBucket.calories,
                status: parsedStatus,
                image_url: image_url
            });

            return res.status(200).json(iceCreamBucket);
    
        } catch (error) {
            return res.status(500).json({message: "Failed to update Ice Cream Bucket",error: error.message});
        }
    }

    static async deleteIceCreamBucketById(req, res) {
        try {
            const { id } = req.params;
    
            const iceCreamBucket = await IceCreamBucket.findByPk(id);
    
            if (!iceCreamBucket) {
                return res.status(404).json({
                    message: "Ice Cream Bucket not found"
                });
            }
    
            // Agar image folder se remove karna hai (optional)
            if (iceCreamBucket.image_url) {
                const fs = require("fs");
                const path = require("path");
    
                const filePath = path.join(__dirname, "..", iceCreamBucket.image_url);
    
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
    
            // Delete from database
            await iceCreamBucket.destroy();
    
            return res.status(200).json({
                message: "Ice Cream Bucket deleted successfully"
            });
    
        } catch (error) {
            return res.status(500).json({
                message: "Failed to delete Ice Cream Bucket",
                error: error.message
            });
        }
    }
        
      

}
module.exports = IceCreamBucketController;