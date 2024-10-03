import { Router } from 'express';
import { CreateStore } from '../../controller/stores/index.js';

const StoreRoutes = Router();

StoreRoutes.post('/create-store', CreateStore)

export default StoreRoutes;