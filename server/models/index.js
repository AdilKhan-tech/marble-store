const CakeSize = require("./CakeSize");
const CakeFlavor = require("./CakeFlavor");
const CustomCakeTypes = require("./CustomCakeTypes");

const CookiesBoxSizes = require("./CookiesBoxSizes");
const CookiesBoxTypes = require("./CookiesBoxTypes");
const Cookies = require("./Cookies");
const CustomCakeFlavor = require("./CustomCakeFlavor");
const Product = require("./Product")
const Gender = require("./Gender")
const ProductBranch = require("./ProductBranch");
const Category = require("./Category")
const Branch = require("./Branch");

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

// Cookies belongs to CookiesBoxTypes
Cookies.belongsTo(CookiesBoxTypes, {
  foreignKey: "cookie_type_id",
  as: "type",
});

//Custom Cake Size Belong to Custom Cake Flavor
CustomCakeTypes.hasMany(CustomCakeFlavor, {
  foreignKey: "cake_type_id",
  as: "customCakeflavor",
});

CustomCakeFlavor.belongsTo(CustomCakeTypes, {
  foreignKey: "cake_type_id",
  as: "customCakeType",
});


//Category Belong to Product
Branch.hasMany(Product, {
  foreignKey: "product_branch_id",
  as: "product",
});

Product.belongsTo(Branch, {
  foreignKey: "product_branch_id",
  as: "productBranch",
});

//gender Belong to Product
Gender.hasMany(Product, {
  foreignKey: "genders_id",
  as: "product",
});

Product.belongsTo(Gender, {
  foreignKey: "genders_id",
  as: "productGender",
});

//Category Belong to Product
Category.hasMany(Product, {
  foreignKey: "product_category_id",
  as: "product",
});

Product.belongsTo(Category, {
  foreignKey: "product_category_id",
  as: "productCategory",
});


// Product ka relation ProductBranch ke saath
// Product.hasMany(ProductBranch, {
//   foreignKey: "product_id",
//   as: "branches",
// });

Product.belongsToMany(ProductBranch, {
  through: "ProductBranch",
  onDelete: "CASCADE",
  as:"productBranch",
  hooks: true,
});

ProductBranch.belongsToMany(Product, {
  through: "ProductBranch",
  as: "products",
});



module.exports = {
  CakeSize,
  CakeFlavor,
  CustomCakeTypes,

  CookiesBoxSizes,
  CookiesBoxTypes,
  Cookies,

  CustomCakeTypes,
  CustomCakeFlavor,

  Product,
  Gender,
  ProductBranch,
  Branch,
  Category,

};
