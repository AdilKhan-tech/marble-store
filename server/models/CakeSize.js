const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CustomCakeTypes = require("./CustomCakeTypes");

const CakeSize = sequelize.define("CakeSize", {

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
      notEmpty: {msg: "Name english is required"},
      len: {
        args: [2, 55],
        msg: "Name english must be between 2 and 55 characters",
      },
    },
  },

  name_ar: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notEmpty: {msg: "Name arabic is required"},
      len: {
        args: [2, 55],
        msg: "Name arabic must be between 2 and 55 characters",
      },
    },
  },

  custom_cake_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {msg: "Cake Type ID must be an integer"},
      notNull: {msg: "Cake Type ID is required"},
    },
  },

  slug: {
    type: DataTypes.STRING(55),
    allowNull: true,
    validate: {
      len: {
        args: [0, 55],
        msg: "Slug must be less than 55 characters",
      },
    },
  },

  scoop_size: {
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Scoop size is required"},
      len: {
        args: [1, 55],
        msg: "Scoop size must be between 1 and 55 characters",
      },
    },
  },

  additional_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isFloat: { msg: "Additional price must be a valid number"},
      min: {
        args: [0],
        msg: "Additional price cannot be negative",
      },
    },
  },

  symbol: {
    type: DataTypes.STRING(55),
    allowNull: true,
    validate: {
      len: {
        args: [0, 55],
        msg: "Symbol must be less than 55 characters",
      },
    }
  },

  calories: {
    type: DataTypes.STRING(55),
    allowNull: true,
    validate: {
      len: {
        args: [0, 55],
        msg: "Calories must be less than 55 characters",
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
  tableName: "cake_sizes",
  timestamps: false,
});

module.exports = CakeSize;
