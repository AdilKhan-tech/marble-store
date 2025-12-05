import { host } from "./apiHost"

export const loginRoute = `${host}/users/login`

export const getCategory = `${host}/categories/getAll`;
export const getCakesSizes = `${host}/cakes/sizes`
export const createCakesSizes = `${host}/cakes/sizes`
export const updateCakesSizes = `${host}/cakes/sizes`
// export const deleteCakesSizes = `${host}/cakes/sizes/id`
export const deleteCakesSizes =(cakeId)=> `${host}/cakes/sizes/${cakeId}`;