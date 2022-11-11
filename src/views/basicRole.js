const role = sessionStorage.getItem('role');
alert(role);
if (role === undefined) {
  window.location.href = '/login';
}
