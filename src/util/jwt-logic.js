export const tokenReseter = (req, data) => {
  if (req.accessToken) {
    data.accessToken = req.accessToken;
    return data;
  }
  if (req.refreshToken) {
    data.refreshToken = req.refreshToken;
    return data;
  }
  return data;
};
