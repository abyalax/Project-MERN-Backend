import { Router } from "express";
import { getUserStores, getUserStoresByID } from "../../controller/user/index.js";

const userRoutes = Router();

userRoutes.get('/stores', getUserStores)
userRoutes.get('/stores/:storeId', getUserStoresByID)

export default userRoutes