const CakeSize = require("./CakeSize");
const CakeFlavor = require("./CakeFlavor");
const CustomCakeTypes = require("./CustomCakeType");

const CookieBoxSize = require("./CookieBoxSize");
const CookieBoxType = require("./CookieBoxType");
const Cookie = require("./Cookie");
const CustomCakeFlavor = require("./CustomCakeFlavor");
const Product = require("./Product")
const Gender = require("./Gender")
const ProductBranch = require("./ProductBranch");
const Category = require("./Category")
const Branch = require("./Branch");
const ProductCategory = require("./ProductCategory");
const IceCreamPortionSize = require("./IceCreamPortionSize");
const IceCreamBucket = require("./IceCreamBucket");
const Occasion = require("./Occasion");
const ProductOccasion = require("./ProductOccasion");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

IceCreamBucket.hasMany(IceCreamPortionSize, {
  foreignKey: "icecream_bucket_id",
  as: "portionSizes",
});

IceCreamPortionSize.belongsTo(IceCreamBucket, {
  foreignKey: "icecream_bucket_id",
  as: "iceCreamBucket",
});

Category.hasMany(CakeSize, {
  foreignKey: "cake_category_id",
  as: "sizes",
});

CakeSize.belongsTo(Category, {
  foreignKey: "cake_category_id",
  as: "cakeCategory",
});

Category.hasMany(CakeFlavor, {
  foreignKey: "cake_category_id",
  as: "flavors",
});

CakeFlavor.belongsTo(Category, {
  foreignKey: "cake_category_id",
  as: "cakeCategory",
});

Category.hasMany(CustomCakeFlavor, {
  foreignKey: "cake_category_id",
  as: "cakeCategory",
});

CustomCakeFlavor.belongsTo(Category, {
  foreignKey: "cake_category_id",
  as: "cakeCategory",
});

CookieBoxType.hasMany(CookieBoxSize, {
  foreignKey: "cookie_type_id",
  as: "sizes",
});

CookieBoxSize.belongsTo(CookieBoxType, {
  foreignKey: "cookie_type_id",
  as: "type",
});

Cookie.belongsTo(CookieBoxType, {
  foreignKey: "cookie_type_id",
  as: "type",
});


Gender.hasMany(Product, {
  foreignKey: "gender_id",
  as: "product",
});

Product.belongsTo(Gender, {
  foreignKey: "gender_id",
  as: "gender",
});

Product.belongsToMany(Branch, {
  through: ProductBranch,
  foreignKey: "product_id",
  otherKey: "branch_id",
  as: "branches",
  onDelete: "CASCADE",
});

Branch.belongsToMany(Product, {
  through: ProductBranch,
  foreignKey: "branch_id",
  otherKey: "product_id",
  as: "products",
  onDelete: "CASCADE",
});

Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "categories",
  onDelete: "CASCADE",
});

Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
  otherKey: "product_id",
  as: "products",
  onDelete: "CASCADE",
});

Product.belongsToMany(Occasion, {
  through: ProductOccasion,
  foreignKey: "product_id",
  otherKey: "occasion_id",
  as: "occasions",
  onDelete: "CASCADE",
});

Occasion.belongsToMany(Product, {
  through: ProductOccasion,
  foreignKey: "occasion_id",
  otherKey: "product_id",
  as: "products",
  onDelete: "CASCADE",
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  otherKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Product,{
  through: ProductTag,
  foreignKey: "tag_id",
  otherKey: "product_id",
  as: "products",
  onDelete: "CASCADE",
})

Category.belongsTo(Category, {
  foreignKey: "parent_id",
  as: "parent",
});

Category.hasMany(Category, {
  foreignKey: "parent_id",
  as: "children",
});

module.exports = {
  CakeSize,
  CakeFlavor,
  CustomCakeTypes,

  CookieBoxSize,
  CookieBoxType,
  Cookie,

  CustomCakeTypes,
  CustomCakeFlavor,

  Product,
  Gender,
  ProductBranch,
  Branch,
  Category,
  ProductCategory,

  IceCreamPortionSize,
  IceCreamBucket,

  ProductOccasion,

  ProductTag,
  Tag,

};
