import { Schema } from 'mongoose';

const NoticeSchema = new Schema(
  {
    noticeTitle: {
      type: String,
      required: true,
    },
    noticeContent: {
      type: String,
      required: true,
    },

    deletedAt: {
      type: Date,
      require: false,
    },
  },
  { timestamps: true },
);
export { NoticeSchema };
