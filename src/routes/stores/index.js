import { Router } from 'express';
import { CreateProduct, CreateStore } from '../../controller/stores/index.js';
import { getProductsByStore } from '../../controller/products/index.js';

const StoreRoutes = Router();

StoreRoutes.post('/create-store', CreateStore)
StoreRoutes.post('/create-product', CreateProduct)
StoreRoutes.get('/products', getProductsByStore)

export default StoreRoutes;