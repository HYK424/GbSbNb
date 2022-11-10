import { userModel, productModel, orderModel } from '../db';
import bcrypt from 'bcrypt';
import { AppError } from '../middlewares';

import { sendMail } from '../util/mailsys/send-mail';

class AdminService {
  constructor(requestModel) {
    if (requestModel === 'userModel') {
      this.userModel = userModel;
    }
    if (requestModel === 'orderModel') {
      this.orderModel = orderModel;
    }
  }

  async getUsers() {
    const users = await this.userModel.findAll();

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
    console.log(user);
    if (!user) {
      throw new Error('유저 정보 조회 에러. DB 관리자에게 문의하세요.');
    }

    const hashedRandomStr = await bcrypt.hash(randomStr, 10);

    const result = await this.userModel.changePassword({
      userId: resetUserId,
      changedPassword: hashedRandomStr,
    });

    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '비밀번호 초기화에 실패했습니다.',
      );
    }

    const mailData = await sendMail.test();
    console.log('서비스쪽임');
    console.log(mailData);

    return { status: 200, check: '비밀번호 변경에 성공했습니다.' };
  }

  async getOrder(state) {
    const data = await this.orderModel.findOrder(state);
  }

  async updateUserRole(insertData) {
    const data = await this.userModel.updateRole(insertData);

    if (data) {
      return { status: 200 };
    }
  }
}

const userManagement = new AdminService('userModel');

const orderManagement = new AdminService('orderModel');

export { userManagement, orderManagement };
