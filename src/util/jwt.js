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

      return decodeToken;
    } catch (err) {
      return false;
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
      return decodeToken;
    } catch (err) {
      return false;
    }
  },
};
