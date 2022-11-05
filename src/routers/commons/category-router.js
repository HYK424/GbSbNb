import { Router } from 'express';
import {
  getProductsByCategory,
  addCategory,
  updateCategory,
} from '../../controllers/category-controller';

const categoryRouter = Router();

categoryRouter.post('/', addCategory);

categoryRouter.get('/:categoryId', getProductsByCategory);
categoryRouter.put('/:categoryId', updateCategory);

export { categoryRouter };
