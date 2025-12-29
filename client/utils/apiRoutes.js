import { host } from "./apiHost"

export const loginRoute = `${host}/users/login`

export const getCategory = `${host}/categories/getAll`;

export const getAllCakesSizes = `${host}/cakes/sizes`
export const createCakesSize = `${host}/cakes/sizes`
export const deleteCakeSizeById =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;
export const updateCakeSizeById =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;

export const getAllCustomCakeTypes = `${host}/cakes/customTypes`;
export const createCustomCakeType = `${host}/cakes/customTypes`;
export const deleteCustomCakeTypeById =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;
export const updateCustomCakeTypeById =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;

export const getAllBranches = `${host}/branches/getAll`;
export const createBranch = `${host}/branches/create`;
export const deleteBranchById =(branchId)=> `${host}/branches/delete/${branchId}`;
export const updateBranchById =(branchId)=> `${host}/branches/update/${branchId}`;

export const getAllCakeFlavours = `${host}/cakes/flavors`
export const createCakeFlavour = `${host}/cakes/flavors`
export const deleteCakeFlavourById =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;
export const updateCakeFlavourById =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;

export const getIcecreamSizes = `${host}/icecreams/portions`
export const deleteIcecreamSizes =(icecreamId)=> `${host}/icecreams/portions/${icecreamId}`;
export const createIcecreamSizes = `${host}/icecreams/portions`
export const updateIcecreamSizes =(icecreamId)=> `${host}/icecreams/portions/${icecreamId}`;

export const getIcecreamAddons = `${host}/icecreams/addons`
export const updateIcecreamAddons =(icecreamId)=> `${host}/icecreams/addons/${icecreamId}`;
export const deleteIceCreamsAddons =(icecreamId)=> `${host}/icecreams/addons/${icecreamId}`;
export const deletecakesAddons =(icecreamId)=> `${host}/icecreams/addons/${icecreamId}`;


export const getCookieBoxSizes = `${host}/cookies/size`;
export const deleteCookieBoxSizes =(boxSizeId)=> `${host}/cookies/size/${boxSizeId}`;
export const createCookiesSizes = `${host}/cookies/size`;
export const updateCookiesSizes =(boxSizeId)=> `${host}/cookies/size/${boxSizeId}`;

export const getCookieBoxTypes = `${host}/cookies/types`;
export const deleteCookieBoxTypesById =(boxTypeId)=> `${host}/cookies/types/${boxTypeId}`;
export const createCookiesTypes = `${host}/cookies/types`;
export const updateCookiesTypesById =(boxTypeId)=> `${host}/cookies/types/${boxTypeId}`;

export const getAllCookies = `${host}/cookies/getAll`;
export const deleteCookiesById = (boxTypeId)=> `${host}/cookies/delete/${boxTypeId}`;
export const createCookies = `${host}/cookies/create`
export const updateCookieById = (cookieId) => `${host}/cookies/update/${cookieId}`

export const getAllOcassions = `${host}/occasions/getAll`
export const createOcassion = `${host}/occasions/create`
export const updateOccasionById = (occasionId) => `${host}/occasions/update/${occasionId}`
export const deleteOccasionById = (occasionId) => `${host}/occasions/delete/${occasionId}`