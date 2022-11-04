import {
  userManagement,
  productManagement,
  shippingManagement,
  userService,
} from '../services';
import is from '@sindresorhus/is';

export const adminController = {
  // 사용자 목록을 받음.
  getAllUsers: async (req, res) => {
    console.log('어드민 컨트롤러 접속');
    const result = await userManagement.getUsers();

    const { status, message, users } = result;

    res.status(status).json({ message: message, users: users });
  },

  // 사용자 목록을 받음.
  async getUserInfo(req, res) {
    console.log(`req.params.userId : ${req.params.userId}`);
    console.log(`req.currentUserId : ${req.currentUserId}`);
    console.log(`req.currentUserRole : ${req.currentUserRole}`);

    const serchUserId = req.params.userId;
    const result = await userService.getMyInfo(serchUserId);
    console.log(result);
    const { status, message, userInfo } = result;

    res.status(status).json({ message: message, userInfo: userInfo });
  },

  async forceChangeUserInfo(req, res) {
    console.log(`req.params.userId : ${req.params.userId}`);
    console.log(`req.currentUserId : ${req.currentUserId}`);
    console.log(`req.currentUserRole : ${req.currentUserRole}`);

    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      const forceChangeUserId = req.params.userId;

      const {
        fullName,
        email,
        address,
        phoneNumber,
        // role,
      } = req.body;

      const forceChangeInfo = {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        // ...(role && { role }),
      };

      const result = await userService.updateUser(
        forceChangeUserId,
        forceChangeInfo,
      );

      const { status, message } = result;
      res.status(status).json({ message: message });
    } catch (error) {
      next(error);
    }
  },
  async resetPassword(req, res) {
    console.log(`req.params.userId : ${req.params.userId}`);
    console.log(`req.currentUserId : ${req.currentUserId}`);
    console.log(`req.currentUserRole : ${req.currentUserRole}`);

    const resetUserId = req.params.userId;

    const randomStr = Math.random().toString(36).substring(2, 12);
    //36진수의 문자열 길이제한이 12자리임

    console.log(randomStr);
    const result = await userManagement.resetPassword(resetUserId, randomStr);

    const { status, check } = result;

    res.status(status).json({ check: check });
  },

  async getShipping(req, res) {
    console.log('컨트롤러');
    const state = req.query.state;
    console.log(`state : ${state}`);

    const result = await shippingManagement.getShipping(state);

    //const { status, message, data } = result;

    res.status(200).json('시험중');
  },
};
