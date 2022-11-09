import bcrypt from 'bcrypt';

import { userModel } from '../db';
import { jwtModule } from '../util';
import { checkRole } from '../middlewares';
import { AppError, commonErrors } from '../middlewares';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async login(loginInfo) {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    if (user['deletedAt']) {
      throw new AppError(
        commonErrors.deletedData,
        400,
        '회원 탈퇴한 계정입니다.',
      );
    }

    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new AppError(
        commonErrors.inputError,
        488,
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const accessToken = jwtModule.generateAccess(user._id, user.role);

    const refreshToken = jwtModule.generateRefresh(user._id, user.role);

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
    const userInfo = await this.userModel.findById(userId);

    const userData = {
      fullName: userInfo.fullName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      address: userInfo.address,
      role: userInfo.role,
      createdAt: userInfo.createdAt,
    };

    if (!userData) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    return {
      status: 200,
      message: '유저 정보 조회 성공',
      userInfo: userData,
    };
  }

  async createUser(userInfo) {
    const { email, fullName, password, address, phoneNumber } = userInfo;

    const user = await this.userModel.findByEmail(email);

    if (user) {
      throw new AppError(commonErrors.inputError, 400, '중복된 이메일 입니다.');
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
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '계정 정보를 변경할 수 없습니다.',
      );
    }

    const result = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '정보 변경에 실패하였습니다.',
      );
    }

    return { status: 200, message: '정보변경에 성공하였습니다.' };
  }

  async changePassword(userId, password, changedPassword) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '해당 유저가 존재하지 않습니다.',
      );
    }

    const currentPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, currentPassword);

    if (!isPasswordCorrect) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const hashedChangePassword = await bcrypt.hash(changedPassword, 10);

    const result = await this.userModel.changePassword({
      userId,
      changedPassword: hashedChangePassword,
    });

    console.log(result);

    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '비밀번호 변경에 실패했습니다.',
      );
    }

    return { status: 200, check: '비밀번호 변경에 성공했습니다.' };
  }

  async deleteUser(userId, password) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '삭제할 유저가 존재하지 않습니다.',
      );
    }

    if (user.deletedAt) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '이미 삭제된 유저 입니다.',
      );
    }

    const currentPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, currentPassword);

    if (!isPasswordCorrect) {
      return { status: 400, check: '비밀번호가 옳지 않습니다.' };
    }

    const result = await this.userModel.deleteUser(userId);

    if (!result) {
      throw new AppError(
        commonErrors.inputError,
        400,
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    return { status: 200, message: '회원탈퇴 되셨습니다. 감사합니다.' };
  }
}

const userService = new UserService(userModel);

export { userService };
