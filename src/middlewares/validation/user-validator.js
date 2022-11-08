import { body, param, oneOf, query } from 'express-validator';
import { validatorErrorChecker } from './validatorErrorChecker';

export const userValidator = {
  createUser: [
    body('fullName').notEmpty().isLength({ min: 2, max: 20 }),
    body('email').notEmpty().isLength({ max: 40 }).isEmail(),
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    body('phoneNumber').notEmpty().isLength({ min: 8, max: 20 }),
    body('address').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],

  login: [
    body('email').notEmpty().isLength({ max: 40 }).isEmail(),
    body('password')
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage(
        '비밀번호는 영문과 숫자, 8자 이상 20자 이하로 입력해주세요!',
      ),
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
