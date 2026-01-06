const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_en: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "English name is required" },
      notEmpty: { msg: "English name cannot be empty" },
      len: {
        args: [2, 100],
        msg: "English name must be between 2 and 100 characters",
      },
    },
  },
  name_ar: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "Arabic name is required" },
      notEmpty: { msg: "Arabic name cannot be empty" },
      len: {
        args: [2, 100],
        msg: "English name must be between 2 and 100 characters",
      },
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[a-z0-9-]+$/i,
        msg: "Slug must contain only letters, numbers and hyphens",
      },
    },
  },
  parent_category: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  display_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
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
},{
    tableName: "categories",
    timestamps: false,
});

module.exports = Category;
