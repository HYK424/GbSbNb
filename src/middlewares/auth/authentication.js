//로그인 되어있는가 되어있지 않은가??

import { jwtModule } from '../../util/jwt';

export const authenticator = {
  accessVerify: async (req, res, next) => {
    console.log('=!!=accessVerify=!!=');
    const accessToken = req.headers['authorization']?.split(' ')[1];

    const accessVerify = jwtModule.accessVerify(accessToken);

    !accessVerify
      ? res.status(400).json({ result: false })
      : res.status(200).json({ result: true });
  },

  refreshVerify: async (req, res, next) => {
    console.log('=!!=refreshVerify=!!=');
    const refreshToken = req.headers['authorization']?.split(' ')[1];

    const refreshVerify = jwtModule.refreshVerify(refreshToken);

    if (!refreshVerify) {
      res.status(419).json({ result: false });
    }
    if (refreshVerify) {
      const accessToken = jwtModule.generateAccess(
        refreshVerify.userId,
        refreshVerify.role,
      );

      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  },

  isLoggedIn: async (req, res, next) => {
    console.log('=isLoggedIn=');

    const accessToken = req.headers['authorization']?.split(' ')[1];

    const accessVerify = jwtModule.accessVerify(accessToken);

    req.userId = accessVerify.userId;
    req.role = accessVerify.role;

    !accessVerify
      ? res.status(419).json({
          message: '정상적이지 않은 접근입니다.\n다시 로그인해 주십시오.',
          POSTMAN: '엑세스 토큰이 만료되어 리턴합니다.',
        })
      : next();
  },
};
