const role = sessionStorage.getItem('role');

if (role === null || role === undefined) {
  window.location.href = '/login';
}
