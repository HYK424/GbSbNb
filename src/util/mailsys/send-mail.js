import * as nodemailer from 'nodemailer';

import { AppError, commonErrors } from '../../middlewares';

import { mailForm } from './ext-passwordMail';

let mailValue = {
  from: 'gbsbnb@15team.com',
  to: '',
  subject: '',
  html: '',
};

export const sendMail = {
  password: async (userEmail, resetedPassword) => {
    const passwordForm = await mailForm.passwordForm(resetedPassword);
    console.log(passwordForm);
    mailValue.to = userEmail;
    mailValue.subject = `개발세발네발 비밀번호 리셋 메일입니다.`;
    mailValue.html = passwordForm;
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
