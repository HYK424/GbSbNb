import { Router } from 'express';
import { productController } from '../../controllers';
import { productImageUpload } from '../../util';

import { asyncHandler } from '../../middlewares';

const productRouter = Router();

productRouter.get('/', asyncHandler(productController.getProducts));
productRouter.post(
  '/upload-image',
  productImageUpload.single('image'),
  asyncHandler(productController.setImageUrl),
);

productRouter.get(
  '/search',
  asyncHandler(productController.getProudctsByKeyword),
);
productRouter.get('/:productId', asyncHandler(productController.getProudct));

export { productRouter };
