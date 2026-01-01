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

    Product_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Product Category ID must be an integer" },
        notNull: { msg: "Product Category ID is required" },
      },
    },

    Product_branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Branch ID must be an integer" },
        notNull: { msg: "Branch ID is required" },
      },
    },

    Product_tag: {
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

    cookie_box_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cookie Box Type ID is required" },
        isInt: { msg: "Cookie Box Type ID must be a number" },
      },
    },

    cookie_box_size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cookie Box Size ID is required" },
        isInt: { msg: "Cookie Box Size ID must be a number" },
      },
    },

    cookies_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cookie ID is required" },
        isInt: { msg: "Cookie ID must be a number" },
      },
    },

    occasions_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Occasion ID is required" },
        isInt: { msg: "Occasion ID must be a number" },
      },
    },

    genders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Gender ID is required" },
        isInt: { msg: "Gender ID must be a number" },
      },
    },

    icecream_bucket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Ice Cream Bucket ID is required" },
        isInt: { msg: "Ice Cream Bucket ID must be a number" },
      },
    },

    icecream_addons_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Ice Cream Addon ID is required" },
        isInt: { msg: "Ice Cream Addon ID must be a number" },
      },
    },

    cake_portion_size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cake Portion Size ID is required" },
        isInt: { msg: "Cake Portion Size ID must be a number" },
      },
    },

    cake_size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cake Size ID is required" },
        isInt: { msg: "Cake Size ID must be a number" },
      },
    },

    cake_flavor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cake Flavor ID is required" },
        isInt: { msg: "Cake Flavor ID must be a number" },
      },
    },

    custom_cake_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Custom Cake Type ID is required" },
        isInt: { msg: "Custom Cake Type ID must be a number" },
      },
    },

    custom_cake_size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Custom Cake Size ID is required" },
        isInt: { msg: "Custom Cake Size ID must be a number" },
      },
    },

    custom_cake_flavor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Custom Cake Flavor ID is required" },
        isInt: { msg: "Custom Cake Flavor ID must be a number" },
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
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = Product;
