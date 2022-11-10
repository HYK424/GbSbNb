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

  changePassword: async (req, res) => {
    const userId = req.userId;

    const password = req.body.password;

    const changedPassword = req.body.changedPassword;

    const result = await userService.changePassword(
      userId,
      password,
      changedPassword,
    );

    const { status, check } = result;

    res.status(status).json({ check: check });
  },

  deleteUser: async (req, res) => {
    const userId = req.userId;

    const password = req.body.password;

    const result = await userService.deleteUser(userId, password);

    const { status, message } = result;

    res.status(status).json({ message: message });
  },
};
