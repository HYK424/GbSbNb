import { jwtModule } from '../../util/jwt';

export const authenticator = {
  accessVerify: async (req, res, next) => {
    console.log(req.headers['authorization']);

    const accessToken = req.headers['authorization']?.split(' ')[1];

    const accessVerify = jwtModule.accessVerify(accessToken);

    if (!accessVerify) {
      return res.status(403).json(false);
    }

    return res.status(200).json(true);
  },

  refreshVerify: async (req, res, next) => {
    console.log(req.headers['authorization']);

    const refreshToken = req.headers['authorization']?.split(' ')[1];

    const refreshVerify = jwtModule.refreshVerify(refreshToken);

    if (!refreshVerify) {
      return res.status(403).json(false);
    }
    if (refreshVerify) {
      const accessToken = jwtModule.access(
        refreshVerify.decodeToken['userId'],
        refreshVerify.decodeToken['role'],
      );
      return res.status(200).json({ accessToken: accessToken });
    }
  },
};
