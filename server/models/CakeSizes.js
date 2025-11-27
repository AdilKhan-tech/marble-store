const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CakeSizes = sequelize.define("CakeSizes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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

  scoop_size: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  additional_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },

  symbol: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  calories: {
    type: DataTypes.STRING,
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
  tableName: "cake_sizes",
  timestamps: false,
});

module.exports = CakeSizes;
