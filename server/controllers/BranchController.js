const Branch = require("../models/Branch");

class BranchController {
    
    static async createBranch(req, res) {
        try {
            const {name_en, name_ar, slug, city, address, latitude, longitude, number, timing, branch_store_id, status} = req.body;

            const branch = await Branch.create({
                name_en,
                name_ar,
                slug,
                city,
                address,
                latitude,
                longitude,
                number,
                timing,
                branch_store_id,
                status
            });

            return res.status(201).json({ message: "Branch created successfully", branch })
        } catch (error) {
            res.status(500).json({message: "Failed to create user", error: error.message});
        }
    }

    static async getAllBranches(req, res) {
        try {
            const branches = await Branch.findAll();
            res.status(200).json({branches})
        } catch(error) {
            res.status(500).json({message: "Failed to get branches", error: error.message});
        } 
    }

    static async updateBranchById (req, res) {
        const { id } = req.params;
        const {name_en, name_ar, slug, city, address, latitude, longitude, number, timing, branch_store_id, status} = req.body;
        try {
            const branch = await Branch.findByPk(id);
            if (!branch) {
                return res.status(404).json({ message: "Branch not found" });
            }
            branch.name_en = name_en;
            branch.name_ar = name_ar;
            branch.slug = slug;
            branch.city = city;
            branch.address = address;
            branch.latitude = latitude;
            branch.longitude = longitude;
            branch.number = number;
            branch.timing = timing;
            branch.branch_store_id = branch_store_id;
            branch.status = status;
            await branch.save();
            return res.status(200).json({message: "Branch updated successfully", branch});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteBranchById(req, res) {
        try {
            const { id } = req.params;
            const branch = await Branch.findByPk(id);
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        await branch.destroy();
            return res.status(200).json({ message: "Branch deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BranchController;