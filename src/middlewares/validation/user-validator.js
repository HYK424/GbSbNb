import { body, params, oneOf, query } from 'express-validator';
import { validatorErrorChecker } from './validatorErrorChecker';

export const userValidator = {
  signUp: [
    body('email').notEmpty().isLength({ max: 40 }).isEmail(),
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    body('nickname').notEmpty().isLength({ min: 2, max: 20 }),
    validatorErrorChecker,
  ],
  login: [
    body('email').notEmpty().isLength({ max: 40 }).isEmail(),
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],
};
