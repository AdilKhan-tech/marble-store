const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Tag = sequelize.define("Tag",{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name_en:{
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

  name_ar:{
    type: DataTypes.STRING(55),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name arabic is required" },
      len: {
        args: [2, 55],
        msg: "Name arabic must be between 2 and 55 characters",
      },
      is: {
        args: /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/,
        msg: "Name Arabic must contain only Arabic or English letters",
      },
    },
  },

  slug:{
    type: DataTypes.STRING,
    allowNull: true,
  },

  created_at:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  
  updated_at:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

},{
  tableName: "tags",
  timestamps: false,
});

module.exports = Tag;