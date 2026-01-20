// models/ProductTag.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductTag = sequelize.define(
  "ProductTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name_en: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },

    name_ar: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product_tags",
    timestamps: false,
  }
);

module.exports = ProductTag;
