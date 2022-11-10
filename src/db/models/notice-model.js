import { model } from 'mongoose';

import { NoticeSchema } from '../schemas/notice-schema';

const Notice = model('notices', NoticeSchema);

class NoticeModel {
  static async create(noticeData) {
    console.log(noticeData);
    const newNotice = await Notice.create(noticeData);
    return newNotice;
  }
  static async findAll() {
    const notices = await Notice.find({ deletedAt: { $exists: false } });
    return notices;
  }
  static async delete(noticeId) {
    const filter = { _id: noticeId };
    const deleteAt = { deletedAt: Date.now() };
    const delNotice = await Notice.updateOne({
      filter,
      deleteAt,
    });
    return delNotice;
  }
}

export { NoticeModel };
