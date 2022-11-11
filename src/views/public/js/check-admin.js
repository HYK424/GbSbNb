export const checkAdmin = (() => {
  if (
    sessionStorage.getItem('role') !== 'ADMIN' ||
    sessionStorage.getItem('role') !== 'ADMIN_G'
  ) {
    alert('비정상적인 접근입니다! 정상적인 경로로 접근해주세요 😅');
    location.href = '/';
  }
})();
