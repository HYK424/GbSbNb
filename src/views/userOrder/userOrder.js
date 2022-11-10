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

    function cancelBtn(user) {
        return `<button id='${user.Id}' name='cancel' >주문 취소</button>`
    }
    function deleteBtn(user) {
        return `<button id='${user.Id}' name='delete'>주문 삭제</button>`
    }

    const orderTemplate = orders.map((user) => {
        return `
    <tr id="${user.userId}"  onclick="location.href='/api/orders/${user.userId}'">
            <th width="100rem" scope="row">${user.createdAt}</th>           
            <td width="250rem">${user.orderItems}</td>
            <td width="120rem">${user.status}</td>
          <td width="120rem">
          ${user.status = '상품 준비중' ? cancelBtn(user) : (user.status = '배송완료' ? deleteBtn(user) : user.status)}
          </td>
            </tr>
    `
    }).join('');

    orderList.insertAdjacentHTML('beforeend', orderTemplate);

    const vtn = document.querySelectorAll('tr > button');
    for (const btn of vtn) {
        btn.addEventListener('click', changeStatus);
    }
}


async function changeStatus(e) {
    e.preventDefault();

    if (e.target.name == 'delete') {
        await Api.del('/api/orders', e.target.id, false,)
            .then(location.reload());
    } else {
        await Api.get(`/api/orders/${e.target.id}`, 'cancel', false,)
            .then(location.reload());
    }
}

