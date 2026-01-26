const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = sequelize.define(
  "Category",
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
        notNull: { msg: "English name is required" },
        notEmpty: { msg: "English name cannot be empty" },
        len: {
          args: [2, 100],
          msg: "English name must be between 2 and 100 characters",
        },
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: "English name must contain only letters",
        },
      },
    },
    name_ar: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "Name english is required" },
        notEmpty: { msg: "Name english cannot be empty" },
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
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[a-z0-9]+(-[a-z0-9]+)*$/,
          msg: "Slug must contain only lowercase later, number and hyphens",
        },
        len: {
          args: [2, 100],
          msg: "Slug must be between 2 and 100 characters",
        },
      },
    },
    parent_category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isInt: {
          msg: "Parent category must be a number",
        },
        min: {
          args: [1],
          msg: "Parent category must be greater than 0",
        },
      },
    },
    display_type: {
      type: DataTypes.ENUM("Defult", "Products", "Subcategories", "Both"),
      allowNull: true,
      validate: {
        isIn: {
          args: [["Default", "Products", "Subcategories", "Both"]],
          msg: "Display type must be Default, Products, Subcategories or Both",
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
    tableName: "categories",
    timestamps: false,
  },
);
module.exports = Category;
