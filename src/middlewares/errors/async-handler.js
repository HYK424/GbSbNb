export const asyncHandler = (requestHanlder) => {
  return async (req, res, next) => {
    try {
      await requestHanlder(req, res, next).catch(next);
    } catch (err) {
      next(err);
    }
  };
};
