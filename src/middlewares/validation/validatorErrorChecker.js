import { validationResult } from 'express-validator';

exports.validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  console.log(`에러가 없는가? : ${errors.isEmpty()}`);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: '입력하신 정보를 확인해주세요.' });
  }
  next();
};
