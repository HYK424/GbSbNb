// import { check } from 'express-validator';
import * as Api from '/api.js';

const orderList = document.getElementById('orderList');
// const delevbtn = document.getElementById('deleveryBtn');
// const compbtn = document.getElementById('completeBtn');

getOrderList();

// delevbtn.addEventListener('click', handleDelevery);
// compbtn.addEventListener('click', handleComplete);
//유저 리스트 만들기
async function getOrderList() {
  const orders = await Api.get('/api/orders');
  console.log(orders);

  function cancelBtn(order) {
    return `<button id='${order._id}' name='cancel' >주문 취소</button>`;
  }
  function deleteBtn(order) {
    return `<button id='${order._id}' name='delete'>주문 삭제</button>`;
  }

  const orderTemplate = orders
    .map((order) => {
      return `
    <tr id="handle${order._id}" >
            <th width="100rem" scope="row">${order.createdAt.slice(0, 10)}</th>
            <th width="100rem" scope="row">${order.orderItems[0].title} 외 ${
        order.orderItems.length - 1
      }건</th>
            <td width="120rem">${order.totalPrice.toLocaleString(
              'ko-Kr',
            )}원</td>
            <td width="120rem">${order.status}</td>
          <td width="120rem">
          ${(order.status = '상품 준비 중'
            ? cancelBtn(order)
            : (order.status = '배송 완료' ? deleteBtn(order) : order.status))}
          </td>
            </tr>
    `;
    })
    .join('');

  orderList.insertAdjacentHTML('beforeend', orderTemplate);

  const vtn = document.querySelectorAll('tr > button');
  for (const btn of vtn) {
    btn.addEventListener('click', changeStatus);
  }
}

async function changeStatus(e) {
  e.preventDefault();
  if (e.target.name == 'delete') {
    await Api.del('/api/orders', e.target.id, false);
    document.getElementById(`handle${e.target.id}`).remove();

  } else {
    await Api.get(`/api/orders/${e.target.id}`, 'cancel', false).then(
      location.reload(),
    );
  }
}
