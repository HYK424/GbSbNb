import { body, param, oneOf, query } from 'express-validator';
import { validatorErrorChecker } from './validatorErrorChecker';

export const userValidator = {
  createUser: [
    body('fullName')
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('이름이 너무 길거나 짧습니다.'),
    body('email')
      .trim()
      .notEmpty()
      .isLength({ max: 40 })
      .isEmail()
      .withMessage('이메일 형식이 아닙니다.'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    body('phoneNumber')
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 12 })
      .withMessage('전화번호가 올바르지 않습니다.'),
    body('address.*.postalCode')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 10 }),
    body('address.*.address1').trim().notEmpty().isLength({ min: 8, max: 30 }),
    body('address.*.address2').trim().notEmpty().isLength({ min: 5, max: 30 }),
    validatorErrorChecker,
  ],

  login: [
    body('email')
      .trim()
      .notEmpty()
      .isLength({ max: 40 })
      .isEmail()
      .withMessage('이메일이 올바르지 않습니다.'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    validatorErrorChecker,
  ],

  checkPassword: [
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    body('changedPassword')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    validatorErrorChecker,
  ],

  updateUser: [
    body('fullName')
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('이름이 너무 길거나 짧습니다.'),
    body('email')
      .notEmpty()
      .isLength({ max: 40 })
      .isEmail()
      .withMessage('이메일 형식이 아닙니다.'),
    body('phoneNumber')
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage('전화번호가 올바르지 않습니다.'),
    body('address.*.postalCode')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 10 })
      .withMessage('우편번호를 확인하세요.'),
    body('address.*.address1')
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 30 })
      .withMessage('첫번째 주소를 확인하세요.'),
    body('address.*.address2')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 30 })
      .withMessage('두번째 주소를 확인하세요.'),
    validatorErrorChecker,
  ],
  deleteUser: [
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage('비밀번호는 8자리 이상 20자리 이하로 작성해야 합니다.'),
    validatorErrorChecker,
  ],
};
