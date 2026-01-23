const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const IceCreamAddOn = sequelize.define("IceCreamAddOn",{
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
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [0, 55],
        msg: "Slug must be less than 55 characters"
      }
    }
  },
    
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    defaultValue: "Active",
    validate:{
      isIn:{
        args: [["Active", "Inactive"]],
        msg: "Status must be either Active or Inactive",
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
},{
    tableName: "icecream_add_ons",
    timestamps: false,
  }
);
module.exports = IceCreamAddOn;
