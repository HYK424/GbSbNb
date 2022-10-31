import { userManagement } from '../services';
import is from '@sindresorhus/is';

export const adminController = {
  getAllUsers: async (req, res) => {
    console.log('어드민 컨트롤러 접속');
    const result = await userManagement.getUsers();

    const { status, message, users } = result;

    res.status(status).json({ message: message, users: users });
  },
};
