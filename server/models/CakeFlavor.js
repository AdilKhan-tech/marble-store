const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CakeFlavor = sequelize.define('CakeFlavor', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Name english is  required" },
            notEmpty: { msg: "Name english cannot be empty"},
            len: {
                args: [2, 100],
                msg: "Engish name must be between 2 and 100 characters"
            }
        }
    },
    name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Name arabic is required" },
            notEmpty: { msg: "Name arabic cannot be empty" },
            len: {
                args: [2, 100],
                msg: "Name arabic must be between 2 and 100 characters "
            }
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Category Id is required" },
            isInt: { msg: "Category Id must be a number" },
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: {
                args: /^[a-z0-9-]*$/i,
                msg: "Slug may only contain letters, numbers, and dashes"
            }
        }
    },
    additional_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isFloat: { msg: "Additional price must be a valid number"},
            min: { args: [0], msg: "Additional price cannot be nagative" }
        }
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        validate: {
        isIn: {
            args: [["active", "inactive"]],
            msg: "Status must be either active or inactive",
        }
        }

    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isValid(value) {
              if (!value) return;
        
              const isUrl = /^https?:\/\/.+/.test(value);
              const isLocalPath = /^uploads\/.+/.test(value);
        
              if (!isUrl && !isLocalPath) {
                throw new Error("Image must be a valid URL or a local upload path");
              }
            },
        },
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
}, {
    tableName: 'cake_flavors',
    timestamps: false,
});
 module.exports = CakeFlavor;

