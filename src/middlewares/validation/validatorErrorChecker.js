import { validationResult } from 'express-validator';

import { AppError, commonErrors } from '../../middlewares';

exports.validatorErrorChecker = (req, res, next) => {
  const checkError = validationResult(req);
  console.log(`에러가 없는가? : ${checkError.isEmpty()}`);
  if (!checkError.isEmpty()) {
    console.log(checkError);
    let sumErr = [];
    checkError.errors.forEach((error) => {
      sumErr.push(error.msg);
    });
    throw new AppError(commonErrors.inputError, 400, sumErr.join('/'));
    //return res.status(419).json({ errors: errors.array() });
  }
  next();
};
