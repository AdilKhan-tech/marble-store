const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CakeSize = require("./CakeSize");

const CustomCakeTypes = sequelize.define("CustomCakeTypes",{
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
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
  image_url: {
    type: DataTypes.STRING,
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
},{
  tableName: "custom_cake_types",
  timestamps: false,
}
);

module.exports = CustomCakeTypes;
