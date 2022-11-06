if (!accessVerify && refreshVerify) {
  console.log('accessToken 만료 / 재발급');
  accessToken = jwtModule.access(refreshToken.userId, refreshToken.role);

  res.status(200).json({
    message: '로그인에 성공하셨습니다.',
    role: refreshToken.role,
    accessToken,
    refreshToken,
  });
}

if (accessVerify && !refreshVerify) {
  console.log('refreshToken 만료 / 재발급');
  refreshToken = jwtModule.refresh(accessToken.userId, accessToken.role);

  res.status(200).json({
    message: '로그인에 성공하셨습니다.',
    role: accessToken.role,
    accessToken,
    refreshToken,
  });
}

if (!accessVerify && !refreshVerify) {
  res
    .status(419)
    .json({ message: '로그인이 만료되었습니다. 다시 로그인 해주세요' });
}
