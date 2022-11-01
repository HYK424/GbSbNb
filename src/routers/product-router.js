import { Router } from 'express';
import {
  getProducts,
  addProduct,
  getProudct,
  updateProduct,
  deleteProduct,
} from '../controllers/product-controller';
import { productImageUpload } from '../middlewares/index';

const productRouter = Router();

productRouter.get('/products', getProducts);
productRouter.post('/products', addProduct);

productRouter.get('/products/:productId', getProudct);
productRouter.put('/products/:productId', updateProduct);
productRouter.delete('/products/:productId', deleteProduct);

export { productRouter };
