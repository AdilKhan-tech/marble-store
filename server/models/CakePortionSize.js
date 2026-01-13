const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CakePortionSize = sequelize.define("CakePortionSize",{
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

  slug: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },
  parent_portion_size: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  tableName: "cake_portion_sizes",
  timestamps: false,
}
);
module.exports = CakePortionSize;
