import { body, param, oneOf, query } from 'express-validator';
import { validatorErrorChecker } from './validatorErrorChecker';

export const userValidator = {
  createUser: [
    body('fullName')
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('이름이 너무 길거나 짧습니다.'),
    body('email')
      .notEmpty()
      .isLength({ max: 40 })
      .isEmail()
      .withMessage('이메일 형식이 아닙니다.'),
    body('password')
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    body('phoneNumber')
      .notEmpty()
      .isLength({ min: 8, max: 12 })
      .withMessage('전화번호가 올바르지 않습니다.'),
    //body('address').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],

  login: [
    body('email')
      .notEmpty()
      .isLength({ max: 40 })
      .isEmail()
      .withMessage('이메일이 올바르지 않습니다.'),
    body('password')
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    validatorErrorChecker,
  ],

  checkPassword: [
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    body('changedPassword').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],

  updateUser: [
    body('fullName').notEmpty().isLength({ min: 2, max: 20 }),
    body('email').notEmpty().isLength({ max: 40 }).isEmail(),
    body('phoneNumber').notEmpty().isLength({ min: 8, max: 20 }),
    body('address').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],
  deleteUser: [
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],
};
