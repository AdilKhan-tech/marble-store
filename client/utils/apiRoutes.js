import { host } from "./apiHost"

export const loginRoute = `${host}/users/login`

export const getCategory = `${host}/categories/getAll`;
export const getCakesSizes = `${host}/cakes/sizes`
export const createCakesSize = `${host}/cakes/sizes`
export const deleteCakesSizeById =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;
export const updateCakesSizeById =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;

export const getAllCustomCakeTypes = `${host}/cakes/customTypes`;
export const createCustomCakeType = `${host}/cakes/customTypes`;
export const deleteCustomCakeTypeById =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;
export const updateCustomCakeTypeById =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;

// Other API routes can be added here similarly

export const getCakesFlavour = `${host}/cakes/flavors`
export const createCakesFlavour = `${host}/cakes/flavors`
export const deleteCakesFlavour =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;
export const updateCakesFlavour =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;

export const getIcecreamSizes = `${host}/icecreams/portions`
export const deleteIcecreamSizes =(icecreamId)=> `${host}/icecreams/portion/${icecreamId}`;

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