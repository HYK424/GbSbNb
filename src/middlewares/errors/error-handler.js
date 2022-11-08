import { AppError } from './app-error-handler';

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) return next(err);
  const now = new Date();
  const timestamp = `${now.toLocaleDateString(
    'ko-KR',
  )} ${now.toLocaleTimeString('ko-KR')}`;
  console.error('\x1b[41m%s\x1b[0m', err.name, timestamp, req.url, err.stack);
  const { status = 500, message = '알 수 없는 오류가 발생했어요 :(' } = err;
  return res.status(status).json(message);
};

export { errorHandler };
