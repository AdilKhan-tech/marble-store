const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Occasion = sequelize.define("Occasion",{

id:{
 type: DataTypes.INTEGER,
 primaryKey: true,
 autoIncrement: true,
},
name_en:{
 type: DataTypes.STRING,
 allowNull: false
},
name_ar:{
 type: DataTypes.STRING,
 allowNull: false
},
slug:{
 type: DataTypes.STRING,
 allowNull: true
},
image_url:{
 type: DataTypes.STRING,
 allowNull: true
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
    tableName: "occasions",
    timestamps: false,
});

module.exports = Occasion;