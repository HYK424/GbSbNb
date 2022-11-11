import * as Api from '../api.js';

const noticeTable = document.getElementById('noticeTable');
document.addEventListener('DOMContentLoaded', () => {
  if (
    sessionStorage.getItem('role') == 'ADMIN' ||
    sessionStorage.getItem('role') == 'ADMIN_G'
  ) {
    const createNoticeBtn = document.createElement('button');
    createNoticeBtn.innerText = '작성';
    createNoticeBtn.style.width = '120px';
    createNoticeBtn.style.margin = '0 auto';
    createNoticeBtn.onclick = () => {
      window.location.href = '/admin/noticeWrite';
    };
    noticeTable.before(createNoticeBtn);
  }
});

console.log(sessionStorage.getItem('role') == 'ADMIN');

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
