import * as Api from '/api.js';

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

  const result = await Api.post('/api/notice/createNotice', false, data);

  if (result.err) {
    alert(result.err);
    return;
  }

  if (result.message) {
    alert(result.message);
    window.location.href = '/notice';
  }

  console.log('종료');
}
