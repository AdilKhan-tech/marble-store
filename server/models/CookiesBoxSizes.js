const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CookiesBoxSizes = sequelize.define("CookiesBoxSizes",{
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
    cookies_types_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portion_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
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
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
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
    tableName: "cookies_box_sizes",
    timestamps: false,
  }
);

module.exports = CookiesBoxSizes;
