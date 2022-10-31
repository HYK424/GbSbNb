import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userController } from '../controllers/user-controller';
import { loginAuthenticator } from '../middlewares/authentication';

const userRouter = Router();

// 회원가입 api (아래는 / 이지만, 실제로는 /api/users 로 요청해야 함.)
userRouter.post('/', userController.createUser);

// 로그인 api (아래는 /login 이지만, 실제로는 /api/users/login 로 요청해야 함.)
userRouter.post('/login', userController.logIn);

// 위 api를 제외한 아래 api들은 isLoggedIn를 거치게 됨
userRouter.use(loginAuthenticator.isLoggedIn);

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get('/', userController.getAllUsers);

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.put('/:userId', userController.updateUser);

// 로그아웃
// 로그아웃 요청시 쿠키 삭제
userRouter.get('/logout', userController.logOut);

export { userRouter };
