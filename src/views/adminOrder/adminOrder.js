// import { check } from 'express-validator';
import * as Api from '/api.js';

const orderList = document.querySelector('#orderList');

const delevbtn = document.querySelector('#deleveryBtn');
const compbtn = document.querySelector('#completeBtn');

getOrderList();
// delevbtn.addEventListener('click', handleDelevery);
// compbtn.addEventListener('click', handleComplete);
//유저 리스트 만들기
async function getOrderList() {
    const orders = (await Api.get('/api/admin/orders'));
    console.log(orders);

    orders.forEach((user) => {
        orderList.insertAdjacentHTML(
            'beforeend',
            `
            <tr>
            <th width="80rem" scope="row">${user.userId=="비회원"? user.userId : "회원"}</th>           
            <td width="100rem">${user.receiver}</td>
            <td width="150rem">${user.phoneNumber}</td>
            <td width="350rem">${Object.values(user.address).join(' ')}</td>
            <td width="80rem">${user.orderItems.length} 개</td>
           
            <td width="120rem" >${user.status
            } <input type="checkbox" name="status"
             value="${user.role}" id="${user._id}"></td>
            </tr>
            `,
        );
    });
}

function getstatus() {
    const checked = document.querySelectorAll('input[name="role"]:checked');
    const checkedArr = [];

    checked.forEach((e) => {
        const { id, value } = e;
        console.log(id);
        console.log(value);
        const data = {};
        data[id] = value;
        // data.id = e.id;
        // data.role = e.value;
        checkedArr.push(data);
    });
    return { checkedArr: checkedArr };
}

async function handleUserRole() {
    const result = await Api.put('/api/admin/allusers', '', getstatus());
    console.log(result);
    if (!result) {
        alert('유저 정보 갱신 실패');
    } else {
        alert('유저 정보 갱신 성공');
        location.reload();
    }
}
