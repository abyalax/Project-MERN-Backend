import { Router } from 'express';
import { getAllProducts, getProductsByFilter, getProductsByID } from '../../controller/products/index.js';

const ProductRoutes = Router();

ProductRoutes.get('/', getAllProducts)
ProductRoutes.get('/filter', getProductsByFilter)
ProductRoutes.get('/:id', getProductsByID)


export default ProductRoutes;