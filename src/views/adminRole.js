const role = sessionStorage.getItem('role');

if (role != 'ADMIN' && role != 'ADMIN_G') {
  alert('잘못된 접근 입니다. 관리자라면 로그인 후 이용하세요.');
  window.location.href = '/';
}
