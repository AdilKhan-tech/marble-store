const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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

  cake_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {msg: "Cake Category is required"},
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
    allowNull: true,
  },

  additional_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isFloat: { msg: "Additional price must be a number" },
      min: {
        args: [0],
        msg: "Additional price cannot be negative",
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
  tableName: "cake_sizes",
  timestamps: false,
});

module.exports = CakeSize;
