const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = sequelize.define("Category",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_en: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name_ar: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parent_category: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  display_type: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
},{
    tableName: "categories",
    timestamps: false,
});
module.exports = Category;