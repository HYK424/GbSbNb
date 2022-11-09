class AppError extends Error {
  constructor(name, httpCode, description) {
    console.log(name);
    console.log(httpCode);
    console.log(description);
    super(description);

    this.name = name;
    this.status = httpCode;
  }
}
const appErrorHandler = (err, req, res, next) => {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString(
    'ko-KR',
  )} ${now.toLocaleTimeString('ko-KR')}`;

  console.log('시험용 콘솔 콘솔 콘솔');

  console.log(
    '\x1b[33m%s\x1b[0m',
    err.name,
    timestamp,
    req.url,
    req.method,
    err.stack,
  );
  const { status = 500, message = '알 수 없는 오류가 발생했어요 :(' } = err;

  console.log(status);
  console.log(message);

  return res.status(status).json({ message: message });
};

export { AppError, appErrorHandler };
