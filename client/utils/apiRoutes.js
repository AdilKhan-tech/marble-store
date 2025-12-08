import { host } from "./apiHost"

export const loginRoute = `${host}/users/login`

export const getCategory = `${host}/categories/getAll`;
export const getCakesSizes = `${host}/cakes/sizes`
export const createCakesSizes = `${host}/cakes/sizes`
export const deleteCakesSizes =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;
export const updateCakesSizes =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;

// Other API routes can be added here similarly

export const getCakesFlavour = `${host}/cakes/flavors`
export const createCakesFlavour = `${host}/cakes/flavors`
export const deleteCakesFlavour =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;
export const updateCakesFlavour =(cakeId)=> `${host}/cakes/flavors/${cakeId}`;