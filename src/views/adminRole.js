const role = sessionStorage.getItem('role');

if (role != 'ADMIN' && role != 'ADMIN_G') {
  window.location.href = '/';
}
