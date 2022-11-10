import { Router } from 'express';

import {
  adminRouter,
  adminOrderRouter,
  adminProductRouter,
  adminCategoryRouter,
} from './admins';

import { userRouter } from './users';
import {
  cartRouter,
  categoryRouter,
  productRouter,
  orderRouter,
  noticeRouter,
} from './commons';

import { viewsRouter } from './views-router';

import { authenticator } from '../middlewares';

const router = Router();

router.use('/access', authenticator.accessVerify);
router.use('/refresh', authenticator.refreshVerify);

router.use('/admin', adminRouter);
router.use('/admin/products', adminProductRouter);
router.use('/admin/categories', adminCategoryRouter);
router.use('/admin/orders', adminOrderRouter);

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);

router.use('/notice', noticeRouter);

export { router, viewsRouter };
