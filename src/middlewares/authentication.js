//로그인 되어있는가 되어있지 않은가??

import { jwtModule } from '../util/jwt';

export const authenticator = {
  accessVerify: async (req, res, next) => {
    console.log('=!!=accessVerify=!!=');
    const accessToken = req.headers['authorization']?.split(' ')[1];

    console.log(`accessToken : ${accessToken}`);

    const accessVerify = jwtModule.accessVerify(accessToken);

    console.log(`검증결과 1 : ${accessVerify}`);

    !accessVerify
      ? res.status(400).json({ result: false })
      : res.status(200).json({ result: true });
  },

  refreshVerify: async (req, res, next) => {
    console.log('=!!=refreshVerify=!!=');
    const refreshToken = req.headers['authorization']?.split(' ')[1];

    console.log(`refreshToken : ${refreshToken}`);

    const refreshVerify = jwtModule.refreshVerify(refreshToken);

    console.log(`검증결과 2 : ${refreshVerify}`);

    if (!refreshVerify) {
      res.status(419).json({ result: false });
    }
    if (refreshVerify) {
      console.log(refreshVerify);
      console.log(refreshVerify.userId);
      console.log(refreshVerify.role);
      const accessToken = jwtModule.generateAccess(
        refreshVerify.userId,
        refreshVerify.role,
      );
      console.log(accessToken);
      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  },

  // [{유저아이디 , 현재 롤},{유저아이디 , 현재 롤},{유저아이디 , 현재 롤},{유저아이디 , 현재 롤},{유저아이디 , 현재 롤}]
  // 유저아이디  현재 롤 -> 반대로
  //             basic -> admin_g
  isLoggedIn: async (req, res, next) => {
    console.log('=isLoggedIn=');

    console.log(req.headers);

    const accessToken = req.headers['authorization']?.split(' ')[1];

    console.log(accessToken);

    const accessVerify = jwtModule.accessVerify(accessToken);

    console.log(accessVerify);

    console.log(accessVerify.userId);

    req.currentUserId = accessVerify.userId;
    req.currentUserRole = accessVerify.role;

    // console.log('isLoggedIn 종료');

    !accessVerify
      ? res.status(419).json({
          message: '정상적이지 않은 접근입니다.\n다시 로그인해 주십시오.',
          POSTMAN: '엑세스 토큰이 만료되어 리턴합니다.',
        })
      : next();

    // if (!accessVerify) {
    //   res.status(419).json({
    //     message: '정상적이지 않은 접근입니다.\n다시 로그인해 주십시오.',
    //   });
    // }

    // if (accessVerify.status === 419) {
    //   return res.status(419).json({
    //     message: '정상적이지 않은 접근입니다.',
    //   });
    // }

    // if (refreshVerify.status === 419) {
    //   return res.status(419).json({
    //     message: '정상적이지 않은 접근입니다.',
    //   });
    // }
    // const result = jwtLogic(req, res, accessVerify, refreshVerify);

    // if (result) {
    //   next();
    // }
  },
};

// const jwtLogic = (req, res, accessVerify, refreshVerify) => {
//   if (accessVerify && refreshVerify) {
//     console.log('모든 토큰 정상');
//     req.currentUserId = accessVerify.decodeToken['userId'];
//     req.currentUserRole = accessVerify.decodeToken['role'];

//     return true;
//   }

//   if (!accessVerify && refreshVerify) {
//     console.log('accessToken 만료 / 재발급');
//     const accessToken = jwtModule.access(
//       accessVerify.userId,
//       accessVerify.role,
//     );
//     console.log('accessToken 만료 / 재발급 종료');

//     req.accessToken = accessToken;
//     req.currentUserId = refreshVerify.decodeToken['userId'];
//     req.currentUserRole = refreshVerify.decodeToken['role'];

//     return true;
//   }

//   if (accessVerify && !refreshVerify) {
//     console.log('refreshToken 만료 / 재발급');
//     const refreshToken = jwtModule.refresh(
//       accessVerify.userId,
//       accessVerify.role,
//     );
//     console.log('refreshToken 만료 / 재발급 종료');

//     req.refreshToken = refreshToken;
//     req.currentUserId = accessVerify.decodeToken['userId'];
//     req.currentUserRole = accessVerify.decodeToken['role'];

//     return true;
//   }

// if (!accessVerify && !refreshVerify) {
//   console.log('모든 토큰 만료됨');
//   res
//     .status(419)
//     .json({ message: '로그인이 만료되었습니다. 다시 로그인 해주세요' });
// }
//};
