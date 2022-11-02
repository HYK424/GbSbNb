import { userModel } from '../db';

class AdminService {
  constructor(requestModel) {
    if (requestModel === 'userModel') {
      this.userModel = userModel;
    }
  }

  async getUsers() {
    const users = await this.userModel.findAll();
    console.log('유저');
    console.log(users);
    if (users) {
      return {
        status: 200,
        message: '모든 유저정보 불러오기 성공',
        users: users,
      };
    }
    return { status: 400, message: '유저정보 불러오기 실패', users: null };
  }
}

const userManagement = new AdminService('userModel');

export { userManagement };
