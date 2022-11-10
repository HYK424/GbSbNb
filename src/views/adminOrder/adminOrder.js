// import { check } from 'express-validator';
import * as Api from '/api.js';

const orderList = document.getElementById('orderList');
const delevbtn = document.getElementById('deleveryBtn');
const compbtn = document.getElementById('completeBtn');

getOrderList();
allEvents();

function allEvents() {
  delevbtn.addEventListener('click', handleDelevery);
  compbtn.addEventListener('click', handleComplete);
}

// delevbtn.addEventListener('click', handleDelevery);
// compbtn.addEventListener('click', handleComplete);
//유저 리스트 만들기
async function getOrderList() {
  const orders = await Api.get('/api/admin/orders');

  console.log(orders);

  const orderTemplate = orders
    .map((user) => {
      return `
    <tr id="${user.receiver}">
    <th width="80rem" scope="row">${user.userId == '비회원' ? user.userId : '회원'
        }</th>           
    <td width="100rem">${user.receiver}</td>
    <td width="150rem">${user.phoneNumber}</td>
    <td width="350rem">${Object.values(user.address).join(' ')}</td>
    <td width="80rem">${user.orderItems.length} 개</td>
   
    <td width="120rem" class="selebtn" data-id>${user.status
        }</label> <input type="checkbox" name="status"
     value="${user.role}" id="${user._id}"></td>
    </tr>
    `;
    })
    .join('');

  orderList.insertAdjacentHTML('beforeend', orderTemplate);
}

function getstatus() {
  const checked = document.querySelectorAll('input[name="status"]:checked');
  const checkedArr = [];

  checked.forEach((e) => {
    const { id } = e;
    console.log(id);
    checkedArr.push(id);
  });
  console.log(checkedArr);
  return checkedArr;
}

async function handleDelevery() {
  const result = await Api.put('/api/admin/orders', '', {
    orderIds: getstatus(),
    status: 'delivery',
  });
  console.log(result);
  console.log(getstatus());
  if (!result) {
    alert('배송 정보 갱신 실패');
  } else {
    alert('배송 정보 갱신 성공');
    location.reload();
  }
}

async function handleComplete() {
  const result = await Api.put('/api/admin/orders', '', {
    orderIds: getstatus(),
    status: 'completed',
  });
  console.log(result);
  if (!result) {
    alert('배송 정보 갱신 실패');
  } else {
    alert('배송 정보 갱신 성공');
    location.reload();
  }
}
