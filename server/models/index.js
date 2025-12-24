const CakeSize = require("./CakeSize");
const CakeFlavor = require("./CakeFlavor");
const CustomCakeTypes = require("./CustomCakeTypes");

const CookiesBoxSizes = require("./CookiesBoxSizes");
const CookiesBoxTypes = require("./CookiesBoxTypes");

// Cake Sizes Relations
CustomCakeTypes.hasMany(CakeSize, {
  foreignKey: "custom_cake_type_id",
  as: "sizes",
});

CakeSize.belongsTo(CustomCakeTypes, {
  foreignKey: "custom_cake_type_id",
  as: "customCakeType",
});


//   Cake Flavors Relations 
CustomCakeTypes.hasMany(CakeFlavor, {
  foreignKey: "custom_cake_type_id",
  as: "flavors",
});

CakeFlavor.belongsTo(CustomCakeTypes, {
  foreignKey: "custom_cake_type_id",
  as: "customCakeType",
});

//  Cookies Box Relations
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
  CakeFlavor,
  CustomCakeTypes,

  CookiesBoxSizes,
  CookiesBoxTypes,
};
