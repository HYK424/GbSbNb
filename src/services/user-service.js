import { userModel } from '../db';

import { AppError, commonErrors } from '../middlewares';

import bcrypt from 'bcrypt';

import { jwtModule } from '../util/jwt';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async login(loginInfo) {
    console.log('서비스');
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    if (user['deletedAt']) {
      throw new Error('회원 탈퇴한 계정입니다.');
    }

    console.log(user);

    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const accessToken = jwtModule.access(user._id, user.role);

    const refreshToken = jwtModule.refresh(user._id, user.role);

    return {
      status: 200,
      message: '정상적으로 로그인되었습니다.',
      userName: user.fullName,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }

  async getMyInfo(userId) {
    try {
      const userInfo = await this.userModel.findById(userId);

      const userData = {
        fullName: userInfo.fullName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        role: userInfo.role,
        createdAt: userInfo.createdAt,
      };

      return {
        status: 200,
        message: '유저 정보 조회 성공',
        userInfo: userData,
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
