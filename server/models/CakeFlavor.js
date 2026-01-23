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
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            notNull: { msg: "Name English is  required" },
            notEmpty: { msg: "Name English cannot be empty"},
            len: {
                args: [2, 55],
                msg: "Name English must be between 2 and 55 characters"
            },
            is: {
                args: /^[A-Za-z\s]+$/,
                msg: "Name English must contain only letters",
            },
        }
    },
    name_ar: {
        type: DataTypes.STRING(55),
        allowNull: false,
        validate: {
            notNull: { msg: "Name Arabic is required" },
            notEmpty: { msg: "Name Arabic cannot be empty" },
            len: {
                args: [2, 55],
                msg: "Name Arabic must be between 2 and 55 characters "
            },
            is: {
                args: /^[A-Za-z\s]+$/,
                msg: "Name Arabic must contain only letters",
            },
        }
    },
    custom_cake_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {msg: "Cake Type ID must be an integer"},
            notNull: {msg: "Cake Type ID is required"},
        },
    },
    slug: {
        type: DataTypes.STRING(55),
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
}, {
    tableName: 'cake_flavors',
    timestamps: false,
});
 module.exports = CakeFlavor;

