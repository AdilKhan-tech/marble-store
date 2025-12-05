const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamBucket = sequelize.define("IceCreamBucket", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name_en: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  name_ar: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "PKR"
  },

  calories: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  image_url: {
    type: DataTypes.TEXT,
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
  tableName: "icecream_buckets",
  timestamps: false,
});

module.exports = IceCreamBucket;
