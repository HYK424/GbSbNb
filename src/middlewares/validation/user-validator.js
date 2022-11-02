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
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
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
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    body('phoneNumber').notEmpty().isLength({ min: 8, max: 20 }),
    body('address').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],
  deleteUser: [
    body('password').notEmpty().isLength({ min: 8, max: 20 }),
    validatorErrorChecker,
  ],
};
