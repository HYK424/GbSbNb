import { NoticeModel } from '../db';

import { AppError, commonErrors } from '../middlewares';

export class NoticeService {
  static async createNotice(insertData) {
    console.log(insertData);
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
    console.log('서비스단');
    const result = await NoticeModel.findAll();
    console.log(result);
    return {
      status: 200,
      message: '공지사항 조회 성공.',
      data: result,
    };
  }

  static async getNoticeDetail(noticeId) {
    console.log('서비스단');
    console.log(noticeId);
    const result = await NoticeModel.findOne(noticeId);
    console.log(result);
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
  static async deleteNotice(noticeId) {
    console.log(noticeId);
    const result = await NoticeModel.delete(noticeId);
    console.log(result);
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
