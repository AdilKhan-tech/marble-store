const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Branch = sequelize.define("Branch", {
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

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },

  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },

  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  timing: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  branch_store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  branch_status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
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
  tableName: "branches",
  timestamps: false,
});

module.exports = Branch;
