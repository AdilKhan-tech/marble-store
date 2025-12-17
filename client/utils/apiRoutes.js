import { host } from "./apiHost"

export const loginRoute = `${host}/users/login`

export const getCategory = `${host}/categories/getAll`;
export const getCakesSizes = `${host}/cakes/sizes`
export const createCakesSizes = `${host}/cakes/sizes`
export const deleteCakesSizes =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;
export const updateCakesSizes =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;

export const getAllCustomCakeTypes = `${host}/cakes/customTypes`
export const deleteCustomCakeTypes =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;
export const createCustomCakeTypes = `${host}/cakes/customTypes`;
export const updateCustomCakeTypes =(cakeId)=> `${host}/cakes/customTypes/${cakeId}`;

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