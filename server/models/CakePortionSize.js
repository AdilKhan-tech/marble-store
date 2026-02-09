const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CakePortionSize = sequelize.define(
  "CakePortionSize",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name_en: {
      type: DataTypes.STRING(55),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name english is required" },
        len: {
          args: [2, 55],
          msg: "Name english must be between 2 and 55 characters",
        },
      },
    },

    name_ar: {
      type: DataTypes.STRING(55),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name Arabic is required" },
        len: {
          args: [2, 55],
          msg: "Name Arabic must be between 2 and 55 characters",
        },
      },
    },

    slug: {
      type: DataTypes.STRING(55),
      allowNull: true,
      validate: {
        is: {
          args: /^[a-z0-9]+(-[a-z0-9]+)*$/,
          msg: "Slug must contain only lowercase letters, numbers and single hyphens",
        },
        len: {
          args: [2, 55],
          msg: "Slug must be between 2 and 55 characters",
        },
      },
    },

    parent_portion_size: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isInt: {
          msg: "Parent portion size must be a number , String",
        },
        min: {
          args: [1],
          msg: "Parent portion size must be greater than 0",
        },
      },
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
  },
);
module.exports = CakePortionSize;
