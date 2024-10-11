import { Router } from "express";
import { getUserStores, getUserStoresByID } from "../../controller/user/index.js";
import { getCarts, addToCart, deleteCart, updateCart } from "../../controller/carts/index.js";

const userRoutes = Router();

userRoutes.get('/stores', getUserStores)
userRoutes.get('/stores/:storeId', getUserStoresByID)
userRoutes.get('/carts', getCarts)
userRoutes.put('/carts', updateCart)
userRoutes.post('/carts', addToCart)
userRoutes.delete('/carts', deleteCart)

export default userRoutes