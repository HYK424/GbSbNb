import { userService } from '../services';
import is from '@sindresorhus/is';
export const userController = {
  logIn: async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      const { email, password } = req.body;

      const result = await userService.login({ email, password });

      const { status, message, token } = result;

      res.status(status).json({ message: message, token: token });
    } catch (error) {
      next(error);
    }
  },

  getUserInfo: async (req, res) => {
    const userId = req.currentUserId;

    const result = await userService.getUserInfo(userId);

    const { status, message, userInfo } = result;

    res.status(status).json({ message: message, userInfo: userInfo });
  },

  createUser: async (req, res) => {
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

      res.status(201).json(newUser);
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

      const userId = req.params.userId;

      const {
        fullName,
        email,
        address,
        phoneNumber,
        // role,
      } = req.body;

      const userInfoRequired = { userId, currentPassword };

      const toUpdate = {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        // ...(role && { role }),
      };

      const updatedUserInfo = await userService.updateUser(
        userInfoRequired,
        toUpdate,
      );

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
    const userId = req.params.userId;
    const password = req.body.password;

    console.log(userId);
    console.log(password);

    const result = await userService.deleteUser(userId, password);

    //const { status, message } = result;

    res.status(200).json({ message: '시험중' });
  },
};
