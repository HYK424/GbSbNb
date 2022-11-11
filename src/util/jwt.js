import jwt from 'jsonwebtoken';

export const jwtModule = {
  generate: (userId, role, secretKey, expire) => {
    return jwt.sign({ userId, role }, secretKey, {
      expiresIn: expire,
    });
  },
  verify: (token, secretKey) => {
    try {
      const decodeToken = jwt.verify(token, secretKey);

      return decodeToken;
    } catch (err) {
      return false;
    }
  },

  generateAccess: (userId, role) => {
    return jwtModule.generate(
      userId,
      role,
      process.env.ACCESS_KEY,
      process.env.ACCESS_EXPIRE,
    );
  },
  generateRefresh: (userId, role) => {
    return jwtModule.generate(
      userId,
      role,
      process.env.REFRESH_KEY,
      process.env.REFRESH_EXPIRE,
    );
  },

  accessVerify: (token) => {
    return jwtModule.verify(token, process.env.ACCESS_KEY);
  },
  refreshVerify: (token) => {
    return jwtModule.verify(token, process.env.REFRESH_KEY);
  },
};
