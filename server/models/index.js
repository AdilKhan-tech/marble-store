const CakeSize = require("./CakeSize");
const CustomCakeTypes = require("./CustomCakeTypes");

/* 🔗 Associations */
CustomCakeTypes.hasMany(CakeSize, {
  foreignKey: "custom_cake_type_id",
  as: "sizes",
});

CakeSize.belongsTo(CustomCakeTypes, {
  foreignKey: "custom_cake_type_id",
  as: "customCakeType",
});

module.exports = {
  CakeSize,
  CustomCakeTypes,
};
