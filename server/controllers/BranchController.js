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

            return res.status(200).json(branch);
        } catch (error) {
            return res.status(500).json({
                message: "Failed to create branch",
                error: error.message
            });
        }
    }

    static async getAllBranches(req, res) {
        try {
          const branch = await Branch.findAll();
      
          return res.status(200).json(branch);
        } catch (error) {
            res.status(500).json({message: "Failed to get Branches", error: error.message});
        }
      }

    static async updateBranchById(req, res) {
        const { id } = req.params;
        try {
            const branch = await Branch.findByPk(id);
            if (!branch) {
                return res.status(404).json({ message: "Branch not found" });
            }
            const { 
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
            } = req.body

            await branch.update({
                name_en: name_en ?? branch.name_en,
                name_ar: name_ar ?? branch.name_ar,
                slug: slug ?? branch.slug,
                city: city ?? branch.city,
                address: address ?? branch.address,
                latitude: latitude ?? branch.latitude,
                longitude: longitude ?? branch.longitude,
                number: number ?? branch.number,
                timing: timing ?? branch.timing,
                branch_store_id: branch_store_id ?? branch.branch_store_id,
                status: status ?? branch.status,
            });
    
            return res.status(200).json({message: "Branch updated successfully",branch});
    
        } catch (error) {
            return res.status(500).json({ message: "Failed to update Branch", error: error.message });
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
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BranchController;