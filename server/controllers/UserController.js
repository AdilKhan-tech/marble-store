const User = require("../models/User");

class UserController {

    static async createUser(req, res) {
        const {phone_number} = req.body;

        try {
            const user = await User.create({
                phone_number
            });

            res.status(201).json({message: "user created successfully",
                data: user
            });
        } catch (error) {
            res.status(500).json({message: "Failed to create user",
                error: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { phone_number } = req.body;

            if (!phone_number) {
                return res.status(400).json({
                    message: "Phone number is required"
                });
            }

            let user = await User.findOne({ where: { phone_number } });

            return res.json({message: "Login successful",user});

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = UserController;
