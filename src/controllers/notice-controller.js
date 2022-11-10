import { AppError, commonErrors } from '../middlewares';
import { NoticeService } from '../services/notice-service';

export class noticeController {
  static async createNotice(req, res) {
    console.log('컨트롤러 들어옴');
    const { noticeTitle, noticeContent } = req.body;
    const insertNotice = {
      noticeTitle,
      noticeContent,
    };
    console.log(insertNotice);
    const result = await NoticeService.createNotice(insertNotice);
    console.log(result);
    const { status, message } = result;

    res.status(status).json({ message: message });
  }

  static async getNotice(req, res) {
    console.log('여기로옴 getNotice');
    const result = await NoticeService.getNotice();
    const { status, message, data } = result;

    res.status(status).json({ message: message, data: data });
  }
}