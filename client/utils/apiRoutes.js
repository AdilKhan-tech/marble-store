import { host } from "./apiHost"

export const loginRoute = `${host}/users/login`

export const getCategory = `${host}/categories/`;

export const getAllCakesSizes = `${host}/cakes/sizes`
export const createCakesSize = `${host}/cakes/sizes`
export const deleteCakeSizeById =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;
export const updateCakeSizeById =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;

export const getAllCustomCakeTypes = `${host}/cakes/customTypes`;
export const createCustomCakeType = `${host}/cakes/customTypes`;
export const deleteCustomCakeTypeById =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;
export const updateCustomCakeTypeById =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;

export const getAllBranches = `${host}/branches`;
export const createBranch = `${host}/branches/create`;
export const deleteBranchById =(branchId)=> `${host}/branches/delete/${branchId}`;
export const updateBranchById =(branchId)=> `${host}/branches/update/${branchId}`;

export const getAllCakeFlavours = `${host}/cakes/flavors`
export const createCakeFlavour = `${host}/cakes/flavors`
export const deleteCakeFlavourById =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;
export const updateCakeFlavourById =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;

export const getAllIceCreamPortionSizes = `${host}/icecreams/portions`
export const deleteIceCreamPortionSizeById =(icecreamId)=> `${host}/icecreams/portions/${icecreamId}`;
export const createIcecreamSizes = `${host}/icecreams/portions`
export const updateIcecreamSizes =(icecreamId)=> `${host}/icecreams/portions/${icecreamId}`;


export const getIcecreamAddons = `${host}/icecreams/addons`
export const createIceCreamAddOn = `${host}/icecreams/addons`
export const updateIceCreamAddOnById =(icecreamId)=> `${host}/icecreams/addons/${icecreamId}`;
export const deleteIceCreamsAddonById =(icecreamId)=> `${host}/icecreams/addons/${icecreamId}`;


export const getCookieBoxSizes = `${host}/cookies/sizes`;
export const deleteCookieBoxSizes =(boxSizeId)=> `${host}/cookies/size/${boxSizeId}`;
export const createCookiesSizes = `${host}/cookies/size`;
export const updateCookiesSizes =(boxSizeId)=> `${host}/cookies/size/${boxSizeId}`;

export const getCookieBoxTypes = `${host}/cookies/types`;
export const deleteCookieBoxTypesById =(boxTypeId)=> `${host}/cookies/types/${boxTypeId}`;
export const createCookiesTypes = `${host}/cookies/types`;
export const updateCookiesTypesById =(boxTypeId)=> `${host}/cookies/types/${boxTypeId}`;

export const getAllCookies = `${host}/cookies`;
export const deleteCookiesById = (boxTypeId)=> `${host}/cookies/delete/${boxTypeId}`;
export const createCookies = `${host}/cookies/create`
export const updateCookieById = (cookieId) => `${host}/cookies/update/${cookieId}`

export const getAllOcassions = `${host}/occasions/getAll`
export const createOcassion = `${host}/occasions/create`
export const updateOccasionById = (occasionId) => `${host}/occasions/update/${occasionId}`
export const deleteOccasionById = (occasionId) => `${host}/occasions/delete/${occasionId}`

export const createGender = `${host}/genders/create`
export const getAllGenders = `${host}/genders`
export const deleteGenderById = (genderId) => `${host}/genders/delete/${genderId}`
export const updateGenderById = (genderId) => `${host}/genders/update/${genderId}`


export const getAllCustomCakeFlavor = `${host}/cakes/customFlavors`
export const createCustomCakeFlavor = `${host}/cakes/customflavor`
export const updateCustomCakeFlavorById = (customCakeFlavorId) => `${host}/cakes/customFlavor/${customCakeFlavorId}`
export const deleteCustomCakeFlavorById = (customCakeFlavorId) => `${host}/cakes/customFlavor/${customCakeFlavorId}`

export const getAllProductsRoute = `${host}/products/`
export const deleteProductByIdRoute = (productId) => `${host}/products/delete/${productId}`

export const getAllCategories = `${host}/categories`
export const createCategories = `${host}/categories/create`
export const UpdateCategoriesById = (categoryId) => `${host}/categories/update/${categoryId}`
export const deleteCategoriesById = (categoryId) => `${host}/categories/delete/${categoryId}`

export const getAllIceCreamBuckets = `${host}/icecreams/buckets`
export const createIceCreamBucket = `${host}/icecreams/buckets`
export const deleteIceCreamBucketById =(icecreamId)=> `${host}/icecreams/buckets/${icecreamId}`;
export const updateIceCreamBucketById =(icecreamId)=> `${host}/icecreams/buckets/${icecreamId}`;


