import { Router } from 'express';

import { adminRouter } from './admins';
import { userRouter } from './users';
import {
  cartRouter,
  categoryRouter,
  productRouter,
  orderRouter,
} from './commons';

import { viewsRouter } from './views-router';

import { authenticator } from '../middlewares';

const router = Router();

router.use('/access', authenticator.accessVerify);
router.use('/refresh', authenticator.refreshVerify);

// router.use('/', commonRouter);
// router.use('/admin', adminRouter);

router.use('/admin', adminRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);

export { router, viewsRouter };
