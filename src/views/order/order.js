import * as Api from "/api.js";

const fullNameInput = document.querySelector('#fullNameInput')
const phoneNumberInput = document.querySelector('#phoneNumberInput')
const postalCodeInput = document.querySelector('#postalCodeInput')
const address1Input = document.querySelector('#address1Input')
const address2Input = document.querySelector('#address2Input')
const requestSelectBox = document.querySelector('#requestSelectBox')
const requestInput = document.querySelector('#requestInput')
const orderItemAll = document.querySelector('#orderItemAll')
const orderPrice = document.querySelector('#orderPrice')
const totalPrice = document.querySelector('#totalPrice')
const orderConfirmButton = document.querySelector('#orderConfirmButton')

console.log('help me')
addAllElements()
addAllEvents()

function addAllElements() {
    insertInfo()
}

function addAllEvents() {
    requestSelectBox.addEventListener('change', requestSelectEvent);
    orderConfirmButton.addEventListener('click', orderConfirmEvent);

}

async function insertInfo() {
    if (sessionStorage.getItem('accessToken')) {
        const result = await Api.get("/api/users/myinfo", '', true);
        let { _id, fullName, phoneNumber, address: { postalCode, address1, address2 } } = result.userInfo
        fullNameInput.value = fullName
        phoneNumberInput.value = phoneNumber
        postalCodeInput.value = postalCode
        address1Input.value = address1
        address2Input.value = address2
    }
    //local storage에서 가져오기
    const orderInfo = JSON.parse(localStorage.getItem('order'))
    orderItemAll.innerHTML = orderInfo.orderItems.reduce((acc, cur) => {
        acc += `${cur.title} / ${cur.quantity}개 <br>`
        return acc
    }, '')
    orderPrice.innerHTML = orderInfo.totalPrice
    totalPrice.innerHTML = orderInfo.totalPrice + 3000
}

function requestSelectEvent(e) {
    let target = e.target;

    if (target.value != "6") {
        requestInput.disabled = true;
    } else {
        requestInput.disabled = false;
    }
}

async function orderConfirmEvent(e) {
    let userId = '비회원'
    if (sessionStorage.getItem('accessToken')) {
        userId = JSON.parse(atob(sessionStorage.getItem('accessToken').split('.')[1])).userId
    }

    const request = ''
    if (requestSelectBox.value == "6") {
        request = requestInput.value
    } else {
        let caseOfRequest = requestSelectBox.value;
        let requestArr = [
            '',
            '직접 수령',
            '배송 전 연락',
            '부재 시 경비실',
            '부재 시 문 앞',
            '부재 시 택배함',
        ]
        request = requestArr[parseInt(caseOfRequest)]
    }

    const orderInfo = JSON.parse(localStorage.getItem('order'))


    let data = {
        orderItems: orderInfo.orderItems, //{title, productId, price}
        userId: userId,
        totalPrice: orderInfo.totalPrice,
        request: request,
        address: {
            postalCode: postalCodeInput.value,
            address1Input: address1Input.value,
            address2Input: address2Input.value,
        },
        receiver: fullNameInput.value,
        phoneNumber: phoneNumberInput.value,
    }

    let orderId = await Api.post("/api/orders", true, data)

    localStorage.setItem('orderID', orderId)
    localStorage.removeItem('order')
}