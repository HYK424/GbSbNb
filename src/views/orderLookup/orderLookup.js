import * as Api from '../api.js';

const orderCodeInput = document.querySelector('#orderCode');
const phoneNumberInput = document.querySelector('#phoneNumber');
const submitButton = document.querySelector('#submitButton');

let cancelBtn;
// addAllElements();

addAllEvents();

function addAllEvents() {
  submitButton.addEventListener('click', checkOrder);
}

async function checkOrder(e) {
  e.preventDefault();

  const orderId = orderCodeInput.value;
  const phoneNumber = phoneNumberInput.value;

  const data = {
    orderId,
    phoneNumber,
  };

  const result = await Api.post(`/api/orders/unknown`, true, data);

  console.log(result);
  if (result.err) {
    makeModal(false);
  }
  makeModal(result.data);
}

function makeModal(data) {
  const checkRes = document.querySelector('#checkRes');
  checkRes.innerHTML = '';

  const modal = document.createElement('div');
  const dataInsert = document.createElement('div');
  if (!data) {
    const messageInsert = document.createElement('div');
    messageInsert.innerHTML =
      `<span id='err'>` +
      `<p>확인된 주문내역이 없습니다.</p><p>입력하신 내용을 다시한번 확인해 주십시오.</p>` +
      `</span>`;
    dataInsert.appendChild(messageInsert);
    modal.appendChild(dataInsert);
    checkRes.prepend(modal);
    checkRes.classList.toggle('show');
    return;
  }
  const makeTable = document.createElement('table');
  const makeTr = document.createElement('tr');
  const addressSec = document.createElement('td');

  const productIdSec = document.createElement('td');
  const quantitySec = document.createElement('td');
  const requestSec = document.createElement('td');
  const statusSec = document.createElement('td');
  const btnSec = document.createElement('td');

  cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = '주문취소';
  cancelBtn.className = 'cancelOrder';

  btnSec.appendChild(cancelBtn);

  //   for (let i in data) {
  //     console.log(data[i]);

  addressSec.innerHTML = `${data.address.postalCode} / ${data.address.address1} / ${data.address.address2}`;
  let productIdText = '';
  let quantityText = '';
  for (let i in data.orderItems) {
    productIdText += data.orderItems[i].productId + '/';
    quantityText += data.orderItems[i].quantity + ' <br>';
  }
  productIdSec.innerHTML = productIdText;
  quantitySec.innerHTML = quantityText;

  requestSec.innerHTML = data.request;
  statusSec.innerHTML = data.status;

  makeTr.appendChild(addressSec);
  makeTr.appendChild(productIdSec);
  makeTr.appendChild(quantitySec);

  makeTr.appendChild(requestSec);
  makeTr.appendChild(statusSec);
  makeTr.appendChild(btnSec);

  const basicTable =
    `<table>
  <thead>
    <tr>
      <th>주문 제품</th>
      <th>주문 수량</th>
      <th>배송 주소</th>
      <th>배송 상태</th>
      <th>배송 취소</th>
    </tr>
  </thead>
  <tbody>` +
    makeTr +
    `</tbody>
</table>`;

  makeTable.appendChild(makeTr);
  dataInsert.appendChild(makeTable);
  modal.appendChild(dataInsert);
  checkRes.prepend(modal);
  checkRes.classList.toggle('show');
  //}
  cancelBtn.addEventListener('click', cancelOrder);
}

async function cancelOrder() {
  const orderCancel = confirm('정말 취소하시겠습니까???');
  if (orderCancel) {
    const result = await Api.delete(
      '/api/orders/unknownCancel',
      '',
      true,
      orderCodeInput,
    );

    if (result.err) {
      alert(result.err);
      return;
    }
    alert(result.message);
    window.location.reload();
  }
}
