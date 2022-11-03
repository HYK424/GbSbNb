//로그인 되어있는가 되어있지 않은가??
import * as jwt from 'jsonwebtoken';

export const loginAuthenticator = {
  isLoggedIn: async (req, res, next) => {
    console.log('=isLoggedIn=');

    console.log(req.headers);

    const userToken = req.headers['authorization'].split(' ')[1];

    if (!userToken || userToken === undefined) {
      console.log(
        `서비스 사용 요청이 있습니다.하지만, Authorization 토큰: ${userToken}`,
      );
      res.status(403).json({
        result: '허용되지 않은 접근',
        reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
      });
      return;
    }

    try {
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

      const jwtDecoded = jwt.verify(userToken, secretKey);

      console.log(jwtDecoded);

      const userId = jwtDecoded.userId;

      const role = jwtDecoded.role;

      req.currentUserId = userId;

      req.currentUserRole = role;

      console.log(req.currentUserId);

      console.log(req.currentUserRole);

      next();
    } catch (error) {
      console.log(error);
      res.status(403).json({
        result: '허용되지 않은 접근',
        reason: '다시 로그인해 주십시오.',
      });

      return;
    }
  },

  isNotLoggedIn: async (req, res, next) => {
    console.log('=isNotLoggedIn=');

    try {
      const userToken = req.headers['authorization'].split(' ')[1];

      console.log(typeof userToken);

      console.log(`!userToken : ${!userToken}`);

      if (!userToken || userToken === undefined || userToken === 'null') {
        next();
      } else {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify(userToken, secretKey);

        console.log(jwtDecoded);

        if (jwtDecoded) {
          res.status(400).json({
            message: '이미 로그인 되어있습니다.',
          });
        }
        return;
      }
    } catch (error) {
      console.log(error);
      if (error.name === 'TokenExpiredError') {
        res.status(419).json({
          message: '로그인이 만료되었습니다.',
        });
      }
      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({
          message: '유효하지 않은 로그인 입니다.',
        });
      }
    }
  },
};
