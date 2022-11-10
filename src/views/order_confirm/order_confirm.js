import * as Api from "/api.js";

const orderIdOutput = document.querySelector('#orderIdOutput');
const orderCheckButton = document.querySelector('#orderCheckButton');
const continumShoppingButton = document.querySelector('#continumShoppingButton');
const orderListButton = document.querySelector('#orderListButton');

let orderId = ''

addAllElements();
addAllEvents();

function addAllElements() {
    insertOrderId();
}

function addAllEvents() {
    orderCheckButton.addEventListener('click', () => {
        window.location.href = `/order/${orderId}`;
    });
    continumShoppingButton.addEventListener('click', () => {
        window.location.href = `/`;
    });
}

function insertOrderId() {
    orderId = localStorage.getItem('orderID')
    orderIdOutput.innerHTML = orderId
    localStorage.removeItem('orderID')
}