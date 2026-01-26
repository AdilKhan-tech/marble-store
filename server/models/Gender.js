const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Gender = sequelize.define('Gender', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
      notNull: { msg: "Name Arabic is required" },
      notEmpty: {msg: "Name Arabic cannot be empty" },
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
