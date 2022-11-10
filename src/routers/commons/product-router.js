import { Router } from 'express';
import { productController } from '../../controllers';

import { asyncHandler } from '../../middlewares';

const productRouter = Router();

productRouter.get('/', asyncHandler(productController.getProducts));

productRouter.get(
  '/search',
  asyncHandler(productController.getProudctsByKeyword),
);
productRouter.get('/:productId', asyncHandler(productController.getProudct));

export { productRouter };
