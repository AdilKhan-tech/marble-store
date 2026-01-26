const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CakeSize = require("./CakeSize");

const CustomCakeTypes = sequelize.define(
  "CustomCakeTypes",
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
        notNull: { msg: "Name english is required" },
        notEmpty: { msg: "Name english cannot be empty" },
        len: {
          args: [2, 55],
          msg: "Name english must be between 2 and 55 characters",
        },
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: "English name must contain only letters",
        },
      },
    },
    name_ar: {
      type: DataTypes.STRING(55),
      allowNull: false,
      validate: {
        notNull: { msg: "Name arabic is required" },
        notEmpty: { msg: "Name arabic cannot be empty" },
        len: {
          args: [2, 55],
          msg: "Name arabic must be between 2 and 55 characters",
        },
        is: {
          is: {
            args: /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/,
            msg: "Name Arabic must contain only Arabic or English letters",
          },
        },
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          is: {
            args: /^[a-z0-9]+(-[a-z0-9]+)*$/,
            msg: "Slug must contain only lowercase letters, numbers and hyphens",
          },
          len: {
            args: [2, 100],
            msg: "Slug must be between 2 and 100 characters",
          },
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        validate: {
          isIn: {
            args: [["active", "inactive"]],
            msg: "Status must be either active or inactive",
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
  },
  {
    tableName: "custom_cake_types",
    timestamps: false,
  },
);

module.exports = CustomCakeTypes;
