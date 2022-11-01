//로그인 되어있는가 되어있지 않은가??
import * as jwt from 'jsonwebtoken';

export const loginAuthenticator = {
  isLoggedIn: async (req, res, next) => {
    console.log('isLoggedIn 실행');
    console.log('///////////////////////헤더 정보///////////////////////');
    console.log(req.headers);

    const userToken = req.headers['authorization'].split(' ')[1];
    console.log('///////////////////////토큰 정보///////////////////////');
    console.log(userToken);

    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
    // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
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
    // 해당 token 이 정상적인 token인지 확인
    try {
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
      const jwtDecoded = jwt.verify(userToken, secretKey);

      console.log('디코드');
      console.log(jwtDecoded);

      const userId = jwtDecoded.userId;

      // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
      req.currentUserId = userId;

      console.log(req.currentUserId);

      next();
    } catch (error) {
      // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
      // 403 코드로 JSON 형태로 프론트에 전달함.
      console.log(error);
      res.status(403).json({
        result: '허용되지 않은 접근',
        reason: '다시 로그인해 주십시오.',
      });

      return;
    }
  },

  isNotLoggedIn: async (req, res, next) => {
    console.log('isNotLoggedIn 실행');
    console.log('///////////////////////헤더 정보///////////////////////');
    console.log(req.headers);

    try {
      const userToken = req.headers['authorization'].split(' ')[1];

      console.log('///////////////////////토큰 정보///////////////////////');
      console.log(userToken);

      if (!userToken || userToken === undefined) {
        next();
      } else {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify(userToken, secretKey);

        console.log('디코드');
        console.log(jwtDecoded);

        if (jwtDecoded) {
          res.status(400).json({
            message: '이미 로그인 되어있습니다.',
          });
        }
        return;
      }
    } catch (error) {
      console.log('에러발생');
      console.log(req.headers);
      console.log(error);
      next();
    }
  },
};
