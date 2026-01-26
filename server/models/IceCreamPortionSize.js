const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamPortionSize = sequelize.define("IceCreamPortionSize",{
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
      notNull: { msg: "English name is required" },
      notEmpty: { msg: "English name cannot be empty" },
      len: {
        args: [2, 55],
        msg: "English name must be between 2 and 55 characters",
      },
    },
  },
  name_ar: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notNull: { msg: "Arabic name is required" },
      notEmpty: { msg: "Arabic name cannot be empty" },
      len: {
        args: [2, 55],
        msg: "Arabic name must be between 2 and 55 characters",
      },
    },
  },
  icecream_bucket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Ice cream bucket ID is required" },
      isInt: { msg: "Ice cream bucket ID must be an integer" },
    },
  },
  slug: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notNull: { msg: "Slug is required" },
      notEmpty: { msg: "Slug cannot be empty" },
      is: {
        args: /^[a-z0-9-]+$/i,
        msg: "Slug must contain only letters, numbers and hyphens",
      },
    },
  },
  additional_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notNull: { msg: "Additional price is required" },
      min: {
        args: [0],
        msg: "Additional price must be greater than or equal to 0",
      },
    },
  },
  calories: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      len: {
        args: [0, 50],
        msg: "Calories value must not exceed 50 characters",
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
      }
    }
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
    tableName: "icecream_portion_sizes",
    timestamps: false,
  }
);

module.exports = IceCreamPortionSize;
