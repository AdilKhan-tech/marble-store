const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},
{
    tableName: "users"
});

module.exports = User;