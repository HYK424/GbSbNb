import { model } from 'mongoose';

import { NoticeSchema } from '../schemas/notice-schema';

const Notice = model('notices', NoticeSchema);

class NoticeModel {
  static async create(noticeData) {
    const newNotice = await Notice.create(noticeData);
    return newNotice;
  }
  static async findAll() {
    const notices = await Notice.find({ deletedAt: { $exists: false } });
    return notices;
  }

  static async findOne(noticeId) {
    const noticeDetail = await Notice.findOne({
      _id: noticeId,
      deletedAt: { $exists: false },
    });

    return noticeDetail;
  }

  static async update(noticeId, updateData) {
    const noticeUpdate = await Notice.findOneAndUpdate({
      _id: noticeId,
      noticeTitle: updateData.updateTitle,
      noticeContent: updateData.updateContent,
    });

    return noticeUpdate;
  }

  static async delete(noticeId) {
    const filter = { _id: noticeId };
    const deletedAt = { deletedAt: Date.now() };
    const delNotice = await Notice.updateOne(filter, deletedAt);

    return delNotice;
  }
}

export { NoticeModel };
