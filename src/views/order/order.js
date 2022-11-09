import * as Api from "/api.js";

$ = (i) => document.querySelector(i)

const fullNameInput = $('#fullNameInput')
const phoneNumberInput = $('#phoneNumberInput')
const postalCodeInput = $('#postalCodeInput')
const address1Input = $('#address1Input')
const address2Input = $('#address2Input')
const requestSelectBox = $('#requestSelectBox')
const requestInput = $('#requestInput')
const orderItemAll = $('#orderItemAll')
const orderPrice = $('#orderPrice')
const totalPrice = $('#totalPrice')

addAllElements()
addAllEvents()

function addAllElements() {
    insertUserInfo()
    insertOrderInfo()
}

function addAllEvents() {

}

async function insertUserInfo() {
    const userInfo = await Api.get("/api/users/myinfo");
    let { fullName, phoneNumber, "address": { postalCode, address1, address2 } } = userInfo


}

function insertOrderInfo() {

}