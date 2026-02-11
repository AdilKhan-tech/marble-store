const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Branch = sequelize.define("Branch", {
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
      notEmpty: {msg: "Name Arabic is required" },
      len: {
        args: [2, 55],
        msg: "Name Arabic must be between 2 and 55 characters",
      },
    },
  },

  slug: {
    type: DataTypes.STRING(55),
    allowNull: true,
    validate: {
      is: {
        args: /^[a-z0-9-]+$/i,
        msg: "Slug must contain only letters, numbers and hyphens",
      },
    },
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {msg: "City is required" },
    },
  },

  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Address is required" },
    } 
  },

  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
    validate: {
      min: {
        args: [-90],
        msg: "Latitude must be greater than or equal to -90",
      },
      max: {
        args: [90],
        msg: "Latitude must be less than or equal to 90",
      }
    },
  },

  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
    validate: {
      min: {
        args: [-180],
        msg: "Longitude must be greater than or equal to -180",
      },
      max: {
        args: [180],
        msg: "Longitude must be less than or equal to 180",
      },
    },
  },

  number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9+\- ]+$/i,
        msg: "Phone number format is invalid",
      },
    },
  },

  timing: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: {
        args: [3, 100],
        msg: "Timing must be between 3 and 100 characters",
      },
    },
  },

  branch_store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // validate: {
    //   isInt: {
    //     msg: "Branch store ID must be an integer",
    //   },
    // },
  },

  status: {
    type: DataTypes.ENUM("Active for Pickup Only", "Active for Both", "Inactive for Both"),
    allowNull: false,
    defaultValue: "Active for Both",
    validate: {
      isIn: {
        args: [["Active for Pickup Only", "Active for Both", "Inactive for Both"]],
        msg: "Status must be one of the allowed values",
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
  tableName: "branches",
  timestamps: false,
});

module.exports = Branch;
