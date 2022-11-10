import { body, param, oneOf, query } from 'express-validator';
import { validatorErrorChecker } from './validatorErrorChecker';

export const orderValidator = {
  unknownUser: [
    body('orderCode')
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .withMessage('주문코드를 확인해 주십시오.'),
    body('phoneNumber')
      .trim()
      .notEmpty()
      .isLength({ min: 8, max: 20 })
      .withMessage('전화번호가 올바르지 않습니다.'),
    validatorErrorChecker,
  ],
};
