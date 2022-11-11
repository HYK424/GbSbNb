import * as Api from '/api.js';

let ready = false;

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('accessToken')) {
    const ATB = JSON.parse(
      atob(sessionStorage.getItem('accessToken').split('.')[1]),
    );

    if (ATB.role == 'ADMIN' || ATB.role == 'ADMIN_G') {
      ready = true;

      const contentDiv = document.getElementById('content');
      const delBtn = document.createElement('button');
      delBtn.innerHTML = '공지 삭제';
      delBtn.id = 'delBtn';
      contentDiv.prepend(delBtn);
    }
  }
});

const noticeTitle = document.getElementById('noticeTitle');

const noticeDate = document.getElementById('noticeDate');

const noticeContent = document.getElementById('noticeContent');

const noticeId = window.location.pathname.split('/')[2];

getNoticeDetail();

document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'delBtn') {
    const result = await Api.delete('/api/notice/delete', noticeId, false);

    if (result.err) {
      alert('공지를 삭제하지 못했습니다.');
      return;
    }
    alert(result.message);
    window.location.href = '/notice';
  }
});

async function getNoticeDetail() {
  const result = await Api.get('/api/notice', noticeId, true);

  if (result.err) {
    alert('해당 공지사항을 불러올 수 없습니다.');
    window.location.href = '/notice';
    return;
  }

  noticeTitle.innerHTML = `<strong>${result.data.noticeTitle}</strong>`;
  noticeDate.innerHTML = `
  <strong>${result.data.createdAt.substr(0, 10)}</strong>`;
  noticeContent.innerHTML = `<strong>${result.data.noticeContent}</strong>`;
}
