import jwt from 'jsonwebtoken';

const accessSecretKey = process.env.ACCESS_KEY;
const refreshSecretKey = process.env.REFRESH_KEY;

export const jwtModule = {
  generate: (userId, role, secretKey, expire) => {
    console.log(userId);
    console.log(role);
    console.log(secretKey);
    console.log(expire);
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

  // access: (userId, role) => {
  //   const payload = { userId, role };

  //   return jwt.sign(payload, accessSecretKey, {
  //     expiresIn: process.env.ACCESS_EXPIRE,
  //   });
  // },

  // accessVerify: (accessToken) => {
  //   try {
  //     const decodeToken = jwt.verify(accessToken, accessSecretKey);

  //     return decodeToken;
  //   } catch (err) {
  //     return false;
  //   }
  // },

  // refresh: (userId, role) => {
  //   const payload = { userId, role };
  //   return jwt.sign(payload, refreshSecretKey, {
  //     expiresIn: process.env.REFRESH_EXPIRE,
  //   });
  // },

  // refreshVerify: (refreshToken) => {
  //   try {
  //     const decodeToken = jwt.verify(refreshToken, refreshSecretKey);
  //     return decodeToken;
  //   } catch (err) {
  //     return false;
  //   }
  // },
};
