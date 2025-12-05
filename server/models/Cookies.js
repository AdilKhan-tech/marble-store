const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cookies = sequelize.define("Cookies",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cookies_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
},
{
    tableName: "cookies",
    timestamps: false,
}
);

module.exports = Cookies;
