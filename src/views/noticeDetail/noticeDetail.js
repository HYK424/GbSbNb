import * as Api from '/api.js';

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

const noticeTitle = document.getElementById('noticeTitle');

const noticeDate = document.getElementById('noticeDate');

const noticeContent = document.getElementById('noticeContent');

getNoticeDetail();

async function getNoticeDetail() {
  const noticeId = window.location.pathname.split('/')[2];
  console.log(noticeId);
  const result = await Api.get('/api/notice', noticeId, true);

  if (result.err) {
    alert('해당 공지사항을 불러올 수 없습니다.');
    window.location.href = '/notice';
    return;
  }

  console.log(result);
  console.log(result.data);

  noticeTitle.innerHTML = `<strong>${result.data.noticeTitle}</strong>`;
  noticeDate.innerHTML = `
  <strong>${result.data.createdAt.substr(0, 10)}</strong>`;
  noticeContent.innerHTML = `<strong>${result.data.noticeContent}</strong>`;

  // noticeList.insertAdjacentHTML('beforeend', noticeTemplate);
}
