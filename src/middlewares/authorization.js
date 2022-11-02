// 로그인된 권한은 누구인가
export const checkRole = async (req, res, next) => {
  console.log(`CR : ${req.currentUserRole}`);
  console.log(typeof req.currentUserRole);
  console.log(req.currentUserRole != 'ADMIN');
  if (req.currentUserRole !== 'ADMIN' || req.currentUserRole !== 'ADMIN_G') {
    res.status(403).json({ message: '접근권한이 존재하지 않습니다!' });
    return;
  }
  next();
};
