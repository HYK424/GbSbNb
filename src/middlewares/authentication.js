//로그인 되어있는가 되어있지 않은가??

import { jwtModule } from '../util/jwt';

export const loginAuthenticator = {
  isLoggedIn: async (req, res, next) => {
    console.log('=isLoggedIn=');

    const [Bearer, accessToken, refreshToken] =
      req.headers['authorization']?.split(' ');

    const accessVerify = jwtModule.accessVerify(accessToken);

    const refreshVerify = jwtModule.refreshVerify(refreshToken);

    if (refreshVerify.status === 419) {
      return res.status(419).json({
        message: '정상적이지 않은 접근입니다.\n로그인을 확인하십시오.',
      });
    }

    const result = jwtLogic(req, res, accessVerify, refreshVerify);

    console.log(result);

    if (result) {
      next();
    }
  },

  isNotLoggedIn: async (req, res, next) => {
    console.log('=isNotLoggedIn=');

    console.log(req.headers['authorization']);

    let [Bearer, accessToken, refreshToken] =
      req.headers['authorization']?.split(' ');

    if (accessToken == 'null' && accessToken == 'null') {
      next();
    } else {
      const accessVerify = jwtModule.accessVerify(accessToken);

      const refreshVerify = jwtModule.refreshVerify(refreshToken);

      console.log(accessVerify);

      console.log(refreshVerify);

      if (refreshVerify.status === 419) {
        return res.status(419).json({
          message: '정상적이지 않은 접근입니다.',
        });
      }

      const result = jwtLogic(req, res, accessVerify, refreshVerify);

      // console.log(result);

      if (result) {
        next();
      }
    }
  },
};

const jwtLogic = (req, res, accessVerify, refreshVerify) => {
  console.log(accessVerify);
  console.log(refreshVerify);
  if (!accessVerify && refreshVerify) {
    req.currentUserId = refreshVerify.decodeToken['userId'];
    req.currentUserRole = refreshVerify.decodeToken['role'];

    return true;
  }

  // if (accessVerify && !refreshVerify) {
  //   console.log('refreshToken 만료 / 재발급');
  //   const refreshToken = jwtModule.refresh(
  //     accessVerify.userId,
  //     accessVerify.role,
  //   );
  //   console.log('refreshToken 만료 / 재발급 종료');
  //   return res.status(202).json({ refreshToken: refreshToken });
  // }

  if (!accessVerify && !refreshVerify) {
    console.log('모든 토큰 만료됨');
    return res
      .status(419)
      .json({ message: '로그인이 만료되었습니다. 다시 로그인 해주세요' });
  }

  if (accessVerify && refreshVerify) {
    req.currentUserId = accessVerify.decodeToken['userId'];
    req.currentUserRole = accessVerify.decodeToken['role'];
    // console.log('모든 토큰 정상');
    return true;
  }
};
