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
    requestSelectBox.addEventListener('change', );
    orderConfirmButton.addEventListener('click', );

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
    const orderFake = {
        userId: _id,
        orderItems: [{ title: '123', quantity: '123' }],
        totalPrice: '123',
    }
    orderItemAll.innerHTML = orderFake.orderItems.reduce((acc, cur) => {
        acc += `${cur.title} / ${cur.quantity}개 <br>`
    }, '')
    orderPrice.innerHTML = orderFake.totalPrice
    totalPrice.innerHTML = orderFake.totalPrice + 3000
}