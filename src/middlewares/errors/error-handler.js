import { AppError } from './app-error-handler';

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) return next(err);
  const timestamp = new Date().toISOString();
  console.log('\x1b[41m%s\x1b[0m', err.name, timestamp, req.url);
  res.statusCode = err.status ?? 500;
  return res.json({
    data: null,
    err: err.message,
  });
};

export { errorHandler };
