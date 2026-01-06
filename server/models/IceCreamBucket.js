const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamBucket = sequelize.define("IceCreamBucket", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name_en: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "Name english is required" },
      notEmpty: { msg: "Name english cannot be empty" },
      len: {
        args: [2, 100],
        msg: "Name english must be between 2 and 100 characters",
      },
    },
  },

  name_ar: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "Name arabic is required" },
      notEmpty: { msg: "Name arabic cannot be empty" },
      len: {
        args: [2, 100],
        msg: "Name arabic must be between 2 and 100 characters",
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
        notNull: { msg: "Size is required" },
        notEmpty: { msg: "Size cannot be empty" },
    },
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: { msg: "Price is required" },
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

}, {
  tableName: "icecream_buckets",
  timestamps: false,
});

module.exports = IceCreamBucket;
