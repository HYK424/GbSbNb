import { userManagement, userService } from '../services';

export const adminController = {
  getAllUsers: async (req, res) => {
    const result = await userManagement.getUsers();

    const { status, message, users } = result;

    res.status(status).json({ message: message, users: users });
  },

  async getUserInfo(req, res) {
    const serchUserId = req.params.userId;

    const result = await userService.getMyInfo(serchUserId);

    const { status, message, userInfo } = result;

    res.status(status).json({ message: message, userInfo: userInfo });
  },

  async forceChangeUserInfo(req, res) {
    const forceChangeUserId = req.params.userId;

    const { fullName, email, address, phoneNumber } = req.body;

    const forceChangeInfo = {
      ...(fullName && { fullName }),
      ...(email && { email }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    const result = await userService.updateUser(
      forceChangeUserId,
      forceChangeInfo,
    );

    const { status, message } = result;

    res.status(status).json({ message: message });
  },

  async resetPassword(req, res) {
    const resetUserId = req.params.userId;

    const randomStr = Math.random().toString(36).substring(2, 12);

    const result = await userManagement.resetPassword(resetUserId, randomStr);

    const { status, check } = result;

    res.status(status).json({ check: check });
  },

  updateUserRole: async (req, res) => {
    if (req.role != 'ADMIN') {
      res
        .status(400)
        .json({ message: '해당 기능의 접근 권한이 존재하지 않습니다.' });
    }

    const insertData = req.body.checkedArr;

    const result = await userManagement.updateUserRole(insertData);

    res.status(result.status).json(true);
  },
};
