const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CustomCakeFlavor = sequelize.define("CustomCakeFlavor",{
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
        notEmpty: { msg: "Name English is required" },
        len: {
          args: [2, 55],
          msg: "Name English must be between 2 and 55 characters",
        },
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: "Name English must contain only letters",
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
        is: {
          args: /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/,
          msg: "Name Arabic must contain only Arabic or English letters",
        },
      },
    },
    custom_cake_type_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "Custom Cake Type is required" },
      },
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Slug is required" },
        is: {
          args: /^[a-z0-9-]+$/i,
          msg: "Slug can contain only letters, numbers, and dashes",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
      validate: {
        isIn: {
          args: [["active", "inactive"]],
          msg: "Status must be active or inactive",
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
    tableName: "custom_cake_flavors",
    timestamps: false,
  }
);

module.exports = CustomCakeFlavor;
