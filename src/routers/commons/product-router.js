import { Router } from 'express';
import {
  getProducts,
  addProduct,
  getProudct,
  updateProduct,
} from '../../controllers/product-controller';
import { productImageUpload } from '../../middlewares';

import { loginAuthenticator } from '../../middlewares/authentication';
import { checkRole } from '../../middlewares/authorization';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProudct);

//productRouter.use(loginAuthenticator.isLoggedIn, checkRole);
productRouter.post('/', productImageUpload.single('image'), addProduct);
productRouter.put(
  '/:productId',
  productImageUpload.single('image'),
  updateProduct,
);
// productRouter.delete('/:productId', deleteProduct);

export { productRouter };
