import { userModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  // 로그인
  async login(loginInfo) {
    console.log('로그인 서비스');
    const { email, password } = loginInfo;

    // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    console.log(user); //이렇게 받는 것은 안전한가??

    if (user['deletedAt']) {
      throw new Error('회원 탈퇴한 계정입니다.');
    }

    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      secretKey,
      {
        expiresIn: process.env.ACCESS_EXPIRE,
      },
    );

    return {
      status: 200,
      message: '로그인에 성공하셨습니다.',
      role: user.role,
      token,
    };
  }

  async getMyInfo(userId) {
    try {
      const userInfo = await this.userModel.findById(userId);

      return {
        status: 200,
        message: '유저 정보 조회 성공',
        userInfo: userInfo,
      };
    } catch (err) {
      console.log(err);
      console.log('잘못된 userId');
      return {
        status: 400,
        message: '유저 정보를 조회할 수 없습니다. 고객센터에 문의해주십시오.',
        userInfo: null,
      };
    }
  }

  async createUser(userInfo) {
    const { email, fullName, password, address, phoneNumber } = userInfo;

    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      fullName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
    };

    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  async updateUser(userId, toUpdate) {
    console.log('서비스 실행');

    const user = await this.userModel.findById(userId);

    console.log(user);

    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const result = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    if (!result) {
      return { status: 400, message: '정보변경에 실패했습니다.' };
    }

    return { status: 200, message: '정보변경에 성공하였습니다.' };
  }

  async changePassword(userId, password, changedPassword) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('유저 정보 조회 에러. 관리자에게 문의하세요.');
    }

    const currentPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, currentPassword);
    // console.log(`isPasswordCorrect : ${isPasswordCorrect}`);

    if (!isPasswordCorrect) {
      return { status: 400, check: '비밀번호가 옳지 않습니다.' };
    }

    const hashedChangePassword = await bcrypt.hash(changedPassword, 10);

    const result = await this.userModel.changePassword({
      userId,
      changedPassword: hashedChangePassword,
    });

    if (!result) {
      return { status: 400, check: '비밀번호 변경에 실패했습니다.' };
    }

    return { status: 200, check: '비밀번호 변경에 성공했습니다.' };
  }

  async deleteUser(userId, password) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('유저 정보 조회 에러. 관리자에게 문의하세요.');
    }

    const currentPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, currentPassword);
    // console.log(`isPasswordCorrect : ${isPasswordCorrect}`);

    if (!isPasswordCorrect) {
      return { status: 400, check: '비밀번호가 옳지 않습니다.' };
    }

    const result = await this.userModel.deleteUser(userId);
    console.log(result);
  }
}

const userService = new UserService(userModel);

export { userService };
