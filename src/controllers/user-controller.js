import { userService } from '../services';
import is from '@sindresorhus/is';
export const userController = {
  logIn: async (req, res, next) => {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      console.log(req.body);

      // req (request) 에서 데이터 가져오기
      const { email, password } = req.body;

      // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
      const result = await userService.login({ email, password });

      const { status, message, token } = result;

      // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)

      res.status(status).json({ message: message, token: token });
    } catch (error) {
      next(error);
    }
  },

  getUserInfo: async (req, res) => {
    const userId = req.currentUserId;
    console.log(`userId = ${userId}`);
    const result = await userService.getUserInfo(userId);

    const { status, message, userInfo } = result;

    res.status(status).json({ message: message, userInfo: userInfo });
  },

  createUser: async (req, res) => {
    console.log('createUser 들어옴');
    console.log(req.body);
    try {
      // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        res.status(400).json({ message: '계정생성에 실패하였습니다.' });
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      // req (request)의 body 에서 데이터 가져오기
      const { fullName, email, password } = req.body;

      // 위 데이터를 유저 db에 추가하기
      const newUser = await userService.createUser({
        fullName,
        email,
        password,
      });

      // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
      res.status(201).json(newUser);
    } catch (error) {
      console.log('createUser실패');
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      // params로부터 id를 가져옴
      const userId = req.params.userId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const {
        fullName,
        password,
        address,
        phoneNumber,
        role,
        currentPassword,
      } = req.body;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
      }

      const userInfoRequired = { userId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.updateUser(
        userInfoRequired,
        toUpdate,
      );

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res) => {},

  // logOut: async (req, res) => {
  //   console.log('로그아웃 테스트');
  //   const result = await userService.logout(res);
  //   res.status(200).json('로그아웃 완료');
  // },
};
