import { userModel, productModel, orderModel } from '../db';
import bcrypt from 'bcrypt';

class AdminService {
  constructor(requestModel) {
    console.log(requestModel);
    if (requestModel === 'userModel') {
      this.userModel = userModel;
    }
    if (requestModel === 'orderModel') {
      this.orderModel = orderModel;
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

  async resetPassword(resetUserId, randomStr) {
    const user = await this.userModel.findById(resetUserId);

    if (!user) {
      throw new Error('유저 정보 조회 에러. DB 관리자에게 문의하세요.');
    }

    const hashedRandomStr = await bcrypt.hash(randomStr, 10);
    try {
      await this.userModel.changePassword({
        userId: resetUserId,
        changedPassword: hashedRandomStr,
      });
      return { status: 200, check: '비밀번호 변경에 성공했습니다.' };
    } catch (err) {
      console.log(err);
      console.log(err.name);
      if (err.name === 'CastError') {
        return {
          status: 400,
          check: '비밀번호 변경에 실패했습니다.',
          message: '유저 ID에 문제가 있습니다.',
        };
      }
    }
  }

  async getOrder(state) {
    console.log('서비스');

    // if (state === undefined) state = 'null';

    console.log(`state : ${state}`);

    const data = await this.orderModel.findOrder(state);

    console.log('스키마 종료');
    console.log(data);
  }

  async updateUserRole(insertData) {
    console.log('서비스');

    const data = await this.userModel.updateRole(insertData);
  }
}

const userManagement = new AdminService('userModel');
const productManagement = new AdminService('productModel');
const orderManagement = new AdminService('orderModel');

export { userManagement, productManagement, orderManagement };
