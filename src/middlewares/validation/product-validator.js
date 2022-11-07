import { body } from 'express-validator';
import { validatorErrorChecker } from './validatorErrorChecker';

export const productValidator = {
  createProduct: [
    body('title')
      .notEmpty()
      .isLength({ min: 2, max: 15 })
      .withMessage('제품명은 2글자 이상, 15글자 이하로 작성하세요.'),
    body('price')
      .notEmpty()
      .isNumeric({ min: 1000, max: 10000000 })
      .withMessage('가격은 1,0000원 이상, 100만원 이하로 입력하세요.'),
    body('category')
      .notEmpty()
      .isLength({ min: 2, max: 8 })
      .withMessage('카테고리는 2자 이상, 8자로 입력하세요.'),
    body('description')
      .notEmpty()
      .isLength({ min: 2, max: 200 })
      .withMessage('상세설명은 200자 이하로 작성하세요.'),
    body('manufacturer')
      .notEmpty()
      .isLength({ min: 2, max: 8 })
      .withMessage('제조사는 2자 이상, 8자 이하로 작성하세요.'),
    validatorErrorChecker,
  ],
};
