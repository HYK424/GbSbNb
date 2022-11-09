import * as nodemailer from 'nodemailer';

let mailValue = {
  from: 'gbsbnb@15team.com',
  to: '',
  subject: '',
  text: '',
};

export const sendMail = {
  password: async (userEmail, resetedPassword) => {
    mailValue.to = userEmail;
    mailValue.subject = `개발세발네발 비밀번호 리셋 메일입니다.`;
    mailValue.text = `개발세발네발 발송!!\n리셋 된 비밀번호는 ${resetedPassword}입니다.`;
    transport.sendMail(mailValue, (err, info) => {
      if (err) {
        console.log(err);
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
