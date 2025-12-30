const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamAddOn = sequelize.define("IceCreamAddOn",
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
      validate: {
        notEmpty: { msg: "Name English is required" },
        len: {
          args: [2, 55],
          msg: "Name English must be between 2 and 55 characters",
        },
      },
    },
    name_ar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {msg: "Name Arabic is required"},
        len: {
          arg: [2, 55],
          msg: "Name Arabic must be between 2 and 55 characters"
        },
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 55],
        msg: "Slug must be less than 55 characters"
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
      validate:{
        isIn:{
          args: [["active", "inactive"]],
          msg: "Status must be either active or inactive",
        }
      }
    },
    image_url: {
      type: DataTypes.TEXT,
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
    tableName: "icecream_add_ons",
    timestamps: false,
  }
);
module.exports = IceCreamAddOn;
