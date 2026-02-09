const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamBucket = sequelize.define("IceCreamBucket", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[a-z0-9-]+$/i,
        msg: "Slug must contain only letters, number and hyphens",
      }
    }
  },

  size: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
        notEmpty: { msg: "Size is required" },
    },
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Price is required" },
      isDecimal: {
        msg: "Price must be a valid decimal value",
      },
      min: {
        args: [0],
        msg: "Price must be greater than or equal to 0",
      }
    }
  },

  calories: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: "Calories must be a positive number",
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

}, {
  tableName: "icecream_buckets",
  timestamps: false,
});

module.exports = IceCreamBucket;
