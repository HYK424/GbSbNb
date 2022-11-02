import { Router } from 'express';
import { adminController } from '../controllers/admin-controller';
import { checkRole } from '../middlewares/authorization';

const adminRouter = Router();
// 전체 유저 목록을 가져옴 (배열 형태임)
adminRouter.get('/allusers', checkRole, adminController.getAllUsers);

export { adminRouter };
