import { userService } from '../services';
import is from '@sindresorhus/is';

export const userController = {
  logIn: async (req, res, next) => {
    console.log('컨트롤러');
    try {
      const { email, password } = req.body;

      const result = await userService.login({ email, password });

      const { status, role, userName, accessToken, refreshToken } = result;

      let { message } = result;

      if (req.newUserMessage) {
        message = req.newUserMessage;
      }

      let data = {
        message: message,
        tokens: { accessToken: accessToken, refreshToken: refreshToken },
        role: role,
        userName: userName,
      };

      if (role === 'ADMIN' || role === 'ADMIN_G') {
        data.role = role;
      }

      res.status(status).json(data);
    } catch (error) {
      next(error);
    }
  },

  getMyInfo: async (req, res) => {
    const userId = req.currentUserId;
    console.log(userId);

    const data = await userService.getMyInfo(userId);

    const { status, message, userInfo } = data;

    console.log(data);

    console.log('반환시작');

    res.status(status).json({ message: message, userInfo: userInfo });
  },

  createUser: async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        res.status(400).json({ message: '계정생성에 실패하였습니다.' });
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      console.log(req.body);
      const { fullName, email, password, address, phoneNumber } = req.body;

      const newUser = await userService.createUser({
        fullName,
        email,
        password,
        address,
        phoneNumber,
      });

      if (newUser) {
        req.newUserMessage = '계정생성에 성공했습니다.';
      }

      userController.logIn(req, res, next);
    } catch (error) {
      console.log('createUser실패');
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      const userId = req.currentUserId;

      const {
        fullName,
        email,
        address,
        phoneNumber,
        // role,
      } = req.body;

      const toUpdate = {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        // ...(role && { role }),
      };

      const updatedUserInfo = await userService.updateUser(userId, toUpdate);

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res) => {
    const userId = req.params.userId;
    const password = req.body.password;
    const changedPassword = req.body.changedPassword;
    // console.log(`\nuserId : ${userId}\n`);
    // console.log(`\npassword : ${password}\n`);
    // console.log(`\nchangePassword : ${changedPassword}\n`);
    const result = await userService.changePassword(
      userId,
      password,
      changedPassword,
    );

    const { status, check } = result;

    res.status(status).json({ check: check });
  },

  deleteUser: async (req, res) => {
    console.log('delete Start');
    const userId = req.currentUserId;
    const password = req.body.password;

    console.log(userId);
    console.log(password);

    const result = await userService.deleteUser(userId, password);

    //const { status, message } = result;

    res.status(200).json({ message: '시험중' });
  },
};
