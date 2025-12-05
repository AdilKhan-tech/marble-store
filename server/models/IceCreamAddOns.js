const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamAddOns = sequelize.define(
  "IceCreamAddOns",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    add_on_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    add_on_status: {
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
  },
  {
    tableName: "add_new_addon",
    timestamps: false,
  }
);
module.exports = IceCreamAddOns;
