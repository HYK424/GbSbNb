import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export const jwtModule = {
  access: (userId, role) => {
    const payload = { userId, role };
    return jwt.sign(payload, secretKey, {
      expiresIn: process.env.ACCESS_EXPIRE,
    });
  },

  accessVerify: (accessToken) => {
    try {
      const decodeToken = jwt.verify(accessToken, secretKey);
      return decodeToken;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(419).json({
          message: '로그인이 만료되었습니다.',
        });
      }
      if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
          message: '유효하지 않은 로그인 입니다.',
        });
      }
    }
  },
  refresh: () => {
    return jwt.sign({}, secretKey, {
      expiresIn: process.env.REFRESH_EXPIRE,
    });
  },
  refreshVerify: (refreshToken, email) => {
    console.log(refreshToken);
    console.log(email);
    try {
    } catch (err) {}
  },
};
