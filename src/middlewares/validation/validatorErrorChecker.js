import { validationResult } from 'express-validator';

exports.validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  console.log(`에러가 없는가? : ${errors.isEmpty()}`);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
