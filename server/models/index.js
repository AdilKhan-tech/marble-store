const CakeSize = require("./CakeSize");
const CustomCakeTypes = require("./CustomCakeTypes");

const CookiesBoxSizes = require("./CookiesBoxSizes");
const CookiesBoxTypes = require("./CookiesBoxTypes");

/* 🔗 Associations */
CustomCakeTypes.hasMany(CakeSize, {
  foreignKey: "custom_cake_type_id",
  as: "sizes",
});

CakeSize.belongsTo(CustomCakeTypes, {
  foreignKey: "custom_cake_type_id",
  as: "customCakeType",
});

/* 🔗 Associations */
CookiesBoxTypes.hasMany(CookiesBoxSizes, {
  foreignKey: "cookies_types_id",
  as: "sizes",
});

CookiesBoxSizes.belongsTo(CookiesBoxTypes, {
  foreignKey: "cookies_types_id",
  as: "type",
});

module.exports = {
  CakeSize,
  CustomCakeTypes,

  CookiesBoxSizes,
  CookiesBoxTypes,
};
