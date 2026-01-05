const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "Name English is required" },
        notEmpty: { msg: "Name English cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Name English must be between 2 and 100 characters",
        },
      },
    },

    name_ar: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "Name Arabic is required" },
        notEmpty: { msg: "Name Arabic cannot be empty" },
        len: {
          args: [2, 100],
          msg: "Name Arabic must be between 2 and 100 characters",
        },
      },
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description cannot be empty" },
        len: {
          args: [5, 255],
          msg: "Description must be between 5 and 255 characters",
        },
      },
    },

    product_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Product Category must be an integer" },
        notNull: { msg: "Product Category is required" },
      },
    },

    product_branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Branch must be an integer" },
        notNull: { msg: "Branch is required" },
      },
    },

    product_tag: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "Product Tag is required" },
        notEmpty: { msg: "Product Tag cannot be empty" },
        len: {
          args: [2, 50],
          msg: "Product Tag must be between 2 and 50 characters",
        },
      },
    },


    occasions_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Occasion is required" },
        isInt: { msg: "Occasion must be a number" },
      },
    },

    genders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Gender is required" },
        isInt: { msg: "Gender must be a number" },
      },
    },


    regular_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    sale_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    tax_status: {
      type: DataTypes.ENUM("Taxable", "Shipping Only", "None"),
      defaultValue: "Taxable",
      validate: {
        isIn: {
          args: [["Taxable", "Shipping Only", "None"]],
          msg: "Status must be either Taxable , Shipping Only or None",
        },
      },
    },

    tax_class: {
      type: DataTypes.ENUM("Standard", "Popular"),
      defaultValue: "Standard",
      validate: {
        isIn: {
          args: [["Standard", "Popular"]],
          msg: "Status must be either Standard or Popular",
        },
      },
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
    created_at:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    },
  updated_at:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = Product;
