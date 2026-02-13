const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CookieBoxSize = sequelize.define("CookieBoxSize",{
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
        notEmpty: { msg: "Name English is required" },
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
        notEmpty: { msg: "Name Arabic is required" },
        len: {
          args: [2, 55],
          msg: "Name Arabic must be between 2 and 55 characters",
        },
      },
    },
    cookie_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Cookies Type ID is required" },
          isInt: { msg: "Cookies Type ID must be a number" },
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
    portion_size: {
      type: DataTypes.STRING(55),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Portion size is required" },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: { msg: "Price must be a valid number" },
        min: { args: [0], msg: "Price cannot be negative" },
      },
    },
    symbol: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    calories: {
      type: DataTypes.STRING(55),
      allowNull: true,
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
    tableName: "cookies_box_sizes",
    timestamps: false,
  }
);

module.exports = CookieBoxSize;
