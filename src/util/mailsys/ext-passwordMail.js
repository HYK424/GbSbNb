import fs from 'fs';
import path from 'path';
import { AppError, commonErrors } from '../../middlewares';

const dataPath = path.dirname(__filename) + '\\formdata';

export const mailForm = {
  passwordForm: async (pass) => {
    const getForm = await getMailForm('resetPasswordHTML', 'utf-8').then(
      (res) => {
        return res;
      },
    );
    const result = String(getForm).replace('{!!password!!}', pass);
    return result;
  },

  // 아래 추가 가능
};

const getMailForm = (htmlform) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dataPath}/${htmlform}`, (err, data) => {
      if (err) reject(err);
      resolve(data.toString());
    });
  });
};
