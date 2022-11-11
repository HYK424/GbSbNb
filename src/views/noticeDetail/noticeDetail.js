import * as Api from '/api.js';

let ready = false;

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('accessToken')) {
    const ATB = JSON.parse(
      atob(sessionStorage.getItem('accessToken').split('.')[1]),
    );

    if (ATB.role == 'ADMIN' || ATB.role == 'ADMIN_G') {
      ready = true;

      const notice_upperDiv = document.getElementById('content');
      const btnDiv = document.createElement('div');
      const updateBtn = document.createElement('button');
      const updateSubmitBtn = document.createElement('button');
      const delBtn = document.createElement('button');

      btnDiv.id = 'btnDiv';

      updateBtn.innerHTML = '공지 수정';
      updateSubmitBtn.innerHTML = '수정 완료';
      delBtn.innerHTML = '공지 삭제';
      updateBtn.id = 'updateBtn';
      updateBtn.type = 'button';
      updateSubmitBtn.id = 'updateSubmitBtn';
      updateSubmitBtn.type = 'button'; //삭제
      delBtn.id = 'delBtn';
      btnDiv.prepend(delBtn);
      btnDiv.prepend(updateBtn);
      btnDiv.prepend(updateSubmitBtn);
      notice_upperDiv.prepend(btnDiv);
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

  if (e.target && e.target.id === 'updateBtn') {
    noticeTitle.contentEditable = true;
    noticeContent.contentEditable = true;
  }

  if (e.target && e.target.id === 'updateSubmitBtn') {
    updateNotice();
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

async function updateNotice() {
  const updateTitle = String(noticeTitle.innerHTML)
    .replace(/<[^>]*>?/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim();

  const updateContent = String(noticeContent.innerHTML).trim();

  if (updateTitle.length >= 30) {
    alert('수정된 제목이 너무 깁니다');
    return;
  }

  const data = {
    updateTitle,
    updateContent,
  };

  const result = await Api.put('/api/notice', noticeId, data);

  if (result.err) {
    alert(result.err);
    return;
  }

  alert(result.message);

  window.location.reload(true);
}
