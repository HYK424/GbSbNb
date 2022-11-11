import * as Api from '/api.js';

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('accessToken')) {
    const ATB = JSON.parse(
      atob(sessionStorage.getItem('accessToken').split('.')[1]),
    );
    if (ATB.role != 'ADMIN' && ATB.role != 'ADMIN_G') {
      window.location.href = '/';
    }
  }
  if (!sessionStorage.getItem('accessToken')) {
    window.location.href = '/';
  }
});

const noticeTitleInput = document.getElementById('noticeTitle');
const contentDivInput = document.getElementById('contentEdit');
const noticeContentInput = document.getElementById('noticeContent');
const noticeViewMainInput = document.getElementById('noticeViewMain');
const noticeSubmit = document.getElementById('noticeSubmit');

addAllEvents();

function addAllEvents() {
  noticeSubmit.addEventListener('click', createNotice);
}

async function createNotice(e) {
  e.preventDefault();
  alert('클릭됨');
  const noticeTitle = noticeTitleInput.value;

  const contentDiv = contentDivInput.innerHTML;
  noticeContentInput.value = contentDiv;
  const noticeContent = noticeContentInput.value;
  const noticeViewMain = noticeViewMainInput.checked;
  alert(noticeViewMain);
  const data = {
    noticeTitle,
    noticeContent,
    noticeViewMain,
  };
  console.log('빠져나옴');
  const result = await Api.post('/api/notice/createNotice', false, data);
  console.log(result);

  if (result.err) {
    console.log(result.err);
    alert('실패');
    return;
  }

  if (result.message) {
    console.log(result.message);
    alert('성공');
    window.location.href = '/notice';
  }

  console.log('종료');
}
