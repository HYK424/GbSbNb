import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export const jwtModule = {
  access: (userId, role) => {
    const payload = { userId, role };
    return jwt.sign(payload, secretKey, process.env.ACCESS_EXPIRE);
  },
  accessVerify: (accessToken) => {
    try {
      const decodeToken = jwt.verify(accessToken, secretKey);
    } catch (err) {}
  },
  refresh: (data) => {},
  refreshVerify: (data) => {},
};
