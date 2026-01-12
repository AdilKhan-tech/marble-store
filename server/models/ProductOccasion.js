const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductOccasion = sequelize.define("ProductOccasion", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  occasion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
}, {
  tableName: "product_occasions",
  timestamps: false,
});

module.exports = ProductOccasion;
