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

const noticeList = document.getElementById('noticeList');

getNotice();

async function getNotice() {
  const result = await Api.get('/api/notice', '', true);

  if (result.err) {
    alert('공지사항을 불러올 수 없습니다.');
    window.location.href = '/';
    return;
  }

  const noticeTemplate = result.data
    .map((obj) => {
      return `
      <tr onclick="location.href='/notice/${obj._id}'">
        <td width='300rem'><strong>${obj.noticeTitle}</strong></td>
        <td width='100rem'>${obj.createdAt.substr(0, 10)}</td>
      </tr>
    `;
    })
    .join('');

  noticeList.insertAdjacentHTML('beforeend', noticeTemplate);
}
