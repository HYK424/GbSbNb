isAdmin = false;
if (sessionStorage.getItem('accessToken')) {
  const decode = atob(sessionStorage.getItem('accessToken')?.split('.')[1]);
  const payload = JSON.parse(decode);
  const role = payload.role;
  isAdmin = role !== 'basic-user';
  if (!isAdmin) {
    alert('페이지 접근 권한이 없습니다.');
    location.href = '/';
  }
}
