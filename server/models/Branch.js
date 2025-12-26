const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Branch = sequelize.define("Branch", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name_en: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Name english is required" },
      notEmpty: { msg: "Name english cannot be empty" },
      len: {
        arg: [2, 100],
        msg: "Name english must be between 2 and 100 charactors",
      },
    },
  },

  name_ar: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Arabic name is required" },
      notEmpty: {msg: "Arabic name cannot be empty" },
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

  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "City is required" },
      notEmpty: {msg: "City cannot be empty" },
    },
  },

  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: "Address is required" },
      notEmpty: { msg: "Address cannot be empty" },
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
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9+\- ]+$/i,
        msg: "Phone number format is invalid",
      },
    },
  },

  timing: {
    type: DataTypes.STRING,
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
    validate: {
      isInt: {
        msg: "Branch store ID must be an integer",
      },
    },
  },

  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
    validate: {
      isIn: {
        args: [["active", "inactive"]],
        msg: "Status must be active or inactive",
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
