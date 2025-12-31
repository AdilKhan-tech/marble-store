const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CustomCakeFlavors = sequelize.define(
  "CustomCakeFlavor",
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
        notNull: { msg: "Name English is required" },
        notEmpty: { msg: "Name English cannot be empty" },
        len: {
          args: [2, 55],
          msg: "Name English must be between 2 and 55 characters",
        },
      },
    },
    name_ar: {
      type: DataTypes.STRING(55),
      allowNull: false,
      validate: {
        notNull: { msg: "Name Arabic is required" },
        notEmpty: { msg: "Name Arabic cannot be empty" },
        len: {
          args: [2, 55],
          msg: "Name Arabic must be between 2 and 55 characters",
        },
      },
    },
    cake_type_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "Cookies Type ID is required" },
      },
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "Slug is required" },
        notEmpty: { msg: "Slug cannot be empty" },
        is: {
          args: /^[a-z0-9-]+$/i,
          msg: "Slug can contain only letters, numbers, and dashes",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
      validate: {
        isIn: {
          args: [["Active", "Inactive"]],
          msg: "Status must be active or inactive",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValid(value) {
          if (!value) return;

          const isUrl = /^https?:\/\/.+/.test(value);
          const isLocalPath = /^uploads\/.+/.test(value);

          if (!isUrl && !isLocalPath) {
            throw new Error("Image must be a valid URL or a local upload path");
          }
        },
      },
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
    tableName: "custom_cake_flavors",
    timestamps: false,
  }
);

module.exports = CustomCakeFlavors;
