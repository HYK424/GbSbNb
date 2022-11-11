import * as nodemailer from 'nodemailer';

import { AppError, commonErrors } from '../../middlewares';

import { testMail } from './ext-passwordMail';

let mailValue = {
  from: 'gbsbnb@15team.com',
  to: '',
  subject: '',
  html: '',
};

export const sendMail = {
  test: async () => {
    const getMailForm = testMail.doTest('시험이름', '시험비번');
    return getMailForm;
  },

  password: async (userEmail, resetedPassword) => {
    console.log(userEmail);
    console.log(resetedPassword);
    mailValue.to = userEmail;
    mailValue.subject = `개발세발네발 비밀번호 리셋 메일입니다.`;
    mailValue.html = `개발세발네발 발송!!\n<strong>리셋</strong> 된 비밀번호는 ${resetedPassword}입니다.`;
    transport.sendMail(mailValue, (err, info) => {
      if (err) {
        throw new AppError(
          commonErrors.businessError,
          400,
          '리셋되었으나 이메일을 보내지 못했습니다. 관리자에게 문의해주세요.',
        );
      } else {
        console.log(`Email 발송 : ${info.response}`);
      }
    });
  },
};

const transport = nodemailer.createTransport({
  service: 'Gmail',
  prot: 587,
  host: 'gbsbnb@15team.com',
  secure: false,
  requireTLS: true,
  auth: {
    user: 'dhdlsrnr1232@gmail.com',
    pass: 'kqozuykiqclmywmm',
  },
});
