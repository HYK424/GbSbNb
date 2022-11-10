import { AppError } from './app-error-handler';
import { serveStatic } from '../../routers/views-router';

export const notFoundErrorHandler = (req, res, next) => {
  next(
    new AppError(
      `Resource Not Found Error`,
      404,
      `해당 리소스가 존재하지 않습니다 :(`,
    ),
  );
};
