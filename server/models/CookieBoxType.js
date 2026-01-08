const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CookieBoxType = sequelize.define("CookieBoxType", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name_en: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            notNull: { msg: "Name English is required" },
            notEmpty: { msg: "Name English cannot be empty" },
            len: {
                args: [2, 55],
                msg: "Name English must be between 2 and 55 characters",
            },
        },
    },
    name_ar: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            notNull: { msg: "Name Arabic is required" },
            notEmpty: { msg: "Name Arabic cannot be empty" },
            len: {
                args: [2, 55],
                msg: "Name Arabic must be between 2 and 55 characters",
            },
        },
    },
    slug: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            notNull: { msg: "Slug is required" },
            notEmpty: { msg: "Slug cannot be empty" },
            is: {
                args: /^[a-z0-9-]+$/i,
                msg: "Slug can contain only letters, numbers, and dashes",
            },
        },
    },
    sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isInt: { msg: "Sort must be a number" },
            min: { args: [0], msg: "Sort cannot be negative" },
        },
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        validate: {
            isIn: {
                args: [["active", "inactive"]],
                msg: "Status must be active or inactive",
            },
        },
    },
    image_url: {
        type: DataTypes.STRING(255),
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
    tableName: "cookies_box_types",
    timestamps: false,
});

module.exports = CookieBoxType;
