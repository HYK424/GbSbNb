import { Router } from 'express';
import { CategoryController } from '../../controllers';
import { authenticator, checkRole } from '../../middlewares';
import { asyncHandler } from '../../middlewares';

const adminCategoryRouter = Router();

adminCategoryRouter.use(authenticator.isLoggedIn, checkRole);
adminCategoryRouter.post('/', asyncHandler(CategoryController.createCategory));
adminCategoryRouter.put(
  '/:categoryId',
  asyncHandler(CategoryController.updateCategory),
);
adminCategoryRouter.delete(
  '/:categoryId',
  asyncHandler(CategoryController.deleteCategory),
);

export { adminCategoryRouter };
