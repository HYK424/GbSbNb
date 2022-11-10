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
    const userInfo = await Api.get("/api/users/myinfo");
    let { _id, fullName, phoneNumber, "address": { postalCode, address1, address2 } } = userInfo
    fullNameInput.value = fullName
    phoneNumberInput.value = phoneNumber
    postalCodeInput.value = postalCode
    address1Input.value = address1
    address2Input.value = address2

    //local storage에서 가져오기
    const orderInfo = JSON.parse(localStorage.getItem('order'))


    orderItemAll.innerHTML = orderInfo.orderItems.reduce((acc, cur) => {
        acc += `${cur.title} / ${cur.quantity}개 <br>`
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

function orderConfirmEvent(e) {
    //BE로 데이터 보내기
    let orderIdFake = "123"

    localStorage.setItem('orderID', orderIdFake)
    localStorage.removeItem('order')
}