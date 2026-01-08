const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Gender = sequelize.define('Gender', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_en: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: { msg: "English name is required" },
      notEmpty: { msg: "English name cannot be empty" },
      len: {
        args: [2, 50],
        msg: "English name must be between 2 and 50 characters",
      },
    },
  },
  name_ar: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: { msg: "Arabic name is required" },
      notEmpty: { msg: "Arabic name cannot be empty" },
      len: {
        args: [2, 50],
        msg: "Arabic name must be between 2 and 50 characters",
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
  parent_gender: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'genders',
  timestamps: false,
});

module.exports = Gender;
