import { NoticeModel } from '../db';

import { AppError, commonErrors } from '../middlewares';

export class NoticeService {
  static async createNotice(insertData) {
    const result = await NoticeModel.create(insertData);
    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '공지사항이 저장되지 못했습니다.',
      );
    }

    return {
      status: 200,
      message: '공지사항이 작성되었습니다.',
      result: result,
    };
  }

  static async getNotice() {
    const result = await NoticeModel.findAll();

    return {
      status: 200,
      message: '공지사항 조회 성공.',
      data: result,
    };
  }

  static async getNoticeDetail(noticeId) {
    const result = await NoticeModel.findOne(noticeId);

    if (!result) {
      throw new AppError(
        commonErrors.deletedData,
        400,
        '공지사항을 불러올 수 없습니다.',
      );
    }

    return {
      status: 200,
      message: '공지사항 조회 성공.',
      data: result,
    };
  }

  static async updateNotice(noticeId, updateData) {
    const result = await NoticeModel.update(noticeId, updateData);

    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '공지사항을 업데이트 하지 못했습니다.',
      );
    }

    return {
      status: 200,
      message: '공지사항 업데이트 성공',
    };
  }

  static async deleteNotice(noticeId) {
    const result = await NoticeModel.delete(noticeId);

    if (!result) {
      throw new AppError(
        commonErrors.databaseError,
        400,
        '공지사항을 삭제하지 못했습니다..',
      );
    }

    return {
      status: 200,
      message: '공지사항 삭제 성공',
    };
  }
}
