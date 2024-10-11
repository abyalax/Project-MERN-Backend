import { Router } from 'express';
import { CreateProduct, CreateStore } from '../../controller/stores/index.js';

const StoreRoutes = Router();

StoreRoutes.post('/create-store', CreateStore)
StoreRoutes.post('/create-product', CreateProduct)

export default StoreRoutes;