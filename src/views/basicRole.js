if (!sessionStorage.getItem('role')) {
  alert('로그인이 필요한 서비스입니다 😊 로그인 페이지로 보내드릴게요!');
  window.location.href = '/login';
}
