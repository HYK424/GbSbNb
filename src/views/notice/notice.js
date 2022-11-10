import * as Api from '../api.js';

let ready = false;

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('accessToken')) {
    const ATB = JSON.parse(
      atob(sessionStorage.getItem('accessToken').split('.')[1]),
    );
    if (ATB.role != 'ADMIN' && ATB.role != 'ADMIN_G') {
      ready = true;
    }
  }
});

getNotice();

async function getNotice() {
  const result = await Api.get('/api/notice', '', true);

  if (result.err) {
    alert('공지사항을 불러올 수 없습니다.');
    window.location.href = '/';
    return;
  }

  console.log(result);
  console.log(result.data);
}
