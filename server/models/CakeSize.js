const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CakeSize = sequelize.define("CakeSize", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name_en: {
    type: DataTypes.STRING(55),
    allowNull: false,
  },
  name_ar: {
    type: DataTypes.STRING(55),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },

  scoop_size: {
    type: DataTypes.STRING(55),
    allowNull: false,
  },

  additional_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
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
    type: DataTypes.STRING,
    defaultValue: "inactive",
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

module.exports = CakeSize;
