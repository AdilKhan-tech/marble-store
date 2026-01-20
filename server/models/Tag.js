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
  },

  name_ar:{
    type: DataTypes.STRING(55),
    allowNull: false,
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