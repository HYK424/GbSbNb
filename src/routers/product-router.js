import { Router } from 'express';
import {
  getProducts,
  addProduct,
  getProudct,
  updateProduct,
} from '../controllers/product-controller';
import { productImageUpload } from '../middlewares';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', productImageUpload.single('thumbnail'), addProduct);

productRouter.get('/:productId', getProudct);
productRouter.put(
  '/:productId',
  productImageUpload.single('thumbnail'),
  updateProduct,
);
// productRouter.delete('/:productId', deleteProduct);

export { productRouter };
