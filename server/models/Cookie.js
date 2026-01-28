const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cookie = sequelize.define("Cookie",{
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
            // notEmpty: { msg: "Name English is required" },
            notNull: { msg: "English name is required" },
            notEmpty: { msg: "English name cannot be empty" },
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
            notEmpty: { msg: "Name english is required" },
            len: {
              args: [2, 100],
              msg: "Name arabic must be betwwen 2 and 100 characters",
            },
            is: {
              args: /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/,
              msg: "Name Arabic must contain only Arabic or English letters",
            },
          },
    },
    cookie_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Cookie Box Type is required" },
        },
    },
    slug: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Slug is required" },
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
    tableName: "cookies",
    timestamps: false,
}
);

module.exports = Cookie;
