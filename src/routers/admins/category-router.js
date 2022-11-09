import { Router } from 'express';
import { categoryController } from '../../controllers';
import { authenticator, checkRole } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const adminCategoryRouter = Router();

adminCategoryRouter.use(authenticator.isLoggedIn, checkRole);
adminCategoryRouter.post('/', asyncHandler(categoryController.createCategory));
adminCategoryRouter.put(
  '/:categoryId',
  asyncHandler(categoryController.updateCategory),
);
adminCategoryRouter.delete(
  '/:categoryId',
  asyncHandler(categoryController.deleteCategory),
);

export { adminCategoryRouter };
