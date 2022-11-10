// import { check } from 'express-validator';
import * as Api from '/api.js';

const orderList = document.getElementById('orderList');
// const delevbtn = document.getElementById('deleveryBtn');
// const compbtn = document.getElementById('completeBtn');

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
    const orders = await Api.get('/api/orders');
    console.log(orders);

    function cancelBtn(user) {
        return `<btn id='${user.Id}' name='cancel' >주문 취소</btn>`
    }
    function deleteBtn(user) {
        return `<btn id='${user.Id}' name='delete'>주문 삭제</btn>`
    }

    const orderTemplate = orders.map((user) => {
        return `
    <tr id="${user.userId}">
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
    document.querySelectorAll('tr > button')
    

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
