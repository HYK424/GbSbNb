import { Router } from 'express';

import { noticeController } from '../../controllers/notice-controller';
import { authenticator, checkRole } from '../../middlewares';

const noticeRouter = Router();

noticeRouter.get('/', noticeController.getNotice);
noticeRouter.use(authenticator.isLoggedIn, checkRole);
noticeRouter.post('/createNotice', noticeController.createNotice);

export { noticeRouter };
