import * as Api from '/api.js';

if (localStorage.removeItem('orderID')) {
  alert('잘못된 접근입니다 :( 주문 완료 후 다시 방문해 주세요!');
}

const orderIdOutput = document.querySelector('#orderIdOutput');
const orderNumberOutput = document.querySelector('#orderNumberOutput');
const orderCheckButton = document.querySelector('#orderCheckButton');
const continumShoppingButton = document.querySelector(
  '#continumShoppingButton',
);
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
  const orderId = localStorage.getItem('orderID');
  const orderNumber = localStorage.getItem('orderNumber');
  console.log(orderId, orderNumber);
  orderIdOutput.innerText += orderId;
  orderNumberOutput.innerText += orderNumber;
  localStorage.removeItem('orderID');
  localStorage.removeItem('orderNumber');
}
