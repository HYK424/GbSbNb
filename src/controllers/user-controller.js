import { userService } from '../services';
import is from '@sindresorhus/is';
export const userController = {
  createUser: async (req, res) => {
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
      const newUser = await userService.addUser({
        fullName,
        email,
        password,
      });

      // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  readUser: async (req, res) => {},

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
      const updatedUserInfo = await userService.setUser(
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
      const result = await userService.getUserToken({ email, password });

      const { status, message, token } = result;

      if (token != undefined) {
        res.cookie('TOKEN', token, {
          secure: false,
          httpOnly: true,
        });
      }

      // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)

      res.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  },
  logOut: async (req, res) => {
    console.log('로그아웃 테스트');
    const result = await userService.logout(res);
    res.status(200).json('로그아웃 완료');
  },

  getAllUsers: async (req, res) => {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userService.getUsers();

      // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
};
