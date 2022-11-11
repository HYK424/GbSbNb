import { AppError, commonErrors } from '../middlewares';
import { userService } from '../services';

export const userController = {
  logIn: async (req, res, next) => {
    const { email, password } = req.body;

    const result = await userService.login({ email, password });

    const { status, role, userName, accessToken, refreshToken } = result;

    let { message } = result;

    if (req.newUserMessage) {
      message = req.newUserMessage;
    }

    const data = {
      message: message,
      tokens: { accessToken: accessToken, refreshToken: refreshToken },
      role: role,
      userName: userName,
    };

    res.status(status).json(data);
  },

  getMyInfo: async (req, res) => {
    const userId = req.userId;

    const data = await userService.getMyInfo(userId);

    const { status, message, userInfo } = data;

    res.status(status).json({ message: message, userInfo: userInfo });
  },

  createUser: async (req, res, next) => {
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
  },

  updateUser: async (req, res, next) => {
    const userId = req.userId;

    console.log(userId);

    const { fullName, email, address, phoneNumber, role } = req.body;

    const toUpdate = {
      ...(fullName && { fullName }),
      ...(email && { email }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    const updatedUserInfo = await userService.updateUser(userId, toUpdate);

    res.status(200).json(updatedUserInfo);
  },

  async checkPassword(req, res) {
    const userId = req.userId;
    const password = req.body.password;

    const result = await userService.checkPassword(userId, password);

    const { status, message } = result;

    res.status(status).json({ message: message });
  },

  changePassword: async (req, res) => {
    const userId = req.userId;

    const { password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '입력하신 비밀번호가 같지 않습니다. 비밀번호를 확인해주세요',
      );
    }

    const result = await userService.changePassword(userId, passwordConfirm);

    const { status, check } = result;

    res.status(status).json({ check: check });
  },

  async resetPassword(req, res) {
    const { email, phoneNumber } = req.body;
    const randomStr = Math.random().toString(36).substring(2, 12);
    const result = await userService.resetPassword(
      email,
      phoneNumber,
      randomStr,
    );

    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '비밀번호 초기화를 실패 하였습니다.',
      );
    }

    const { status, message } = result;

    res.status(status).json({ message: message });
  },

  deleteUser: async (req, res) => {
    const userId = req.userId;

    const password = req.body.password;

    const result = await userService.deleteUser(userId, password);

    const { status, message } = result;

    res.status(status).json({ message: message });
  },
};
