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

  const noticeTitle = noticeTitleInput.value;

  const contentDiv = contentDivInput.innerHTML;
  noticeContentInput.value = contentDiv;
  const noticeContent = noticeContentInput.value;

  const data = {
    noticeTitle,
    noticeContent,
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
}
