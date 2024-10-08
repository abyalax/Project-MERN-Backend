import { Router } from 'express';
import { getAllProducts,getProductsByID } from '../../controller/products/index.js';

const ProductRoutes = Router();

ProductRoutes.get('/', getAllProducts)
ProductRoutes.get('/:id', getProductsByID)

export default ProductRoutes;