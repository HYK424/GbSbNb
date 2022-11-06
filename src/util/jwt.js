import jwt from 'jsonwebtoken';

const accessSecretKey = process.env.ACCESS_KEY;
const refreshSecretKey = process.env.REFRESH_KEY;

export const jwtModule = {
  access: (userId, role) => {
    const payload = { userId, role };
    return jwt.sign(payload, accessSecretKey, {
      expiresIn: process.env.ACCESS_EXPIRE,
    });
  },

  accessVerify: (accessToken) => {
    try {
      const decodeToken = jwt.verify(accessToken, accessSecretKey);

      return { decodeToken };
    } catch (err) {
      console.log('여기서 에러가 터지는 게 맞나요?');
      if (err.name === 'TokenExpiredError') {
        console.log('accessToken 만료됨');
        return false;
      }

      if (err.name === 'JsonWebTokenError') {
        console.log('유효하지 않은 접근');
        return { status: 419 };
      }
    }
  },

  refresh: (userId, role) => {
    const payload = { userId, role };
    return jwt.sign(payload, refreshSecretKey, {
      expiresIn: process.env.REFRESH_EXPIRE,
    });
  },

  refreshVerify: (refreshToken) => {
    try {
      const decodeToken = jwt.verify(refreshToken, refreshSecretKey);
      return { decodeToken };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        console.log('refreshToken 만료됨');
        return false;
      }

      if (err.name === 'JsonWebTokenError') {
        console.log('유효하지 않은 접근');
        return { status: 419 };
      }
    }
  },
};
