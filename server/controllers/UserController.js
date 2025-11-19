const { where } = require("sequelize");
const User = require("../models/User");

class UserController {

    static async login(req, res){
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({
            message: "Mobile number is required"
            });
        }

        try {
            let user = await User.findOne({ where: { mobile } });
            if (!user) {
            user = await User.create({ mobile });
            }

            return res.json({
            message: "Login successful",
            user
            });

        } catch (error) {
            return res.status(500).json({
            error: error.message
            });
        }
    }
}
module.exports = UserController;