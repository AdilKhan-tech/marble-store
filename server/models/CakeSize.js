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
      notEmpty: {msg: "Name English is required"},
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
      notEmpty: {msg: "Name Arabic is required"},
      len: {
        args: [2, 55],
        msg: "Name Arabic must be between 2 and 55 characters",
      },
      is: {
        args: /^[A-Za-z\s]+$/,
        msg: "Name Arabic must contain only letters",
      },
    },
  },

  custom_cake_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {msg: "Cake Type is required"},
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
