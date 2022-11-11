import * as Api from '/api.js';

const fullNameInput = document.querySelector('#fullNameInput');
const phoneNumberInput = document.querySelector('#phoneNumberInput');
const postalCodeInput = document.querySelector('#postalCodeInput');
const address1Input = document.querySelector('#address1Input');
const address2Input = document.querySelector('#address2Input');
const requestSelectBox = document.querySelector('#requestSelectBox');
const requestInput = document.querySelector('#requestInput');
const orderItemAll = document.querySelector('#orderItemAll');
const orderPrice = document.querySelector('#orderPrice');
const totalPrice = document.querySelector('#totalPrice');
const orderConfirmButton = document.querySelector('#orderConfirmButton');
const searchAddress = document.querySelector('#searchAddress');
addAllElements();
addAllEvents();

function addAllElements() {
  insertInfo();
}

function addAllEvents() {
  requestSelectBox.addEventListener('change', requestSelectEvent);
  orderConfirmButton.addEventListener('click', orderConfirmEvent);
}

async function insertInfo() {
  if (sessionStorage.getItem('accessToken')) {
    const userInfo = (await Api.get('/api/users/myinfo', '', true)).userInfo;
    console.log(userInfo);
    let {
      fullName,
      phoneNumber,
      address: { postalCode, address1, address2 },
    } = userInfo;
    fullNameInput.value = fullName;
    phoneNumberInput.value = phoneNumber;
    postalCodeInput.value = postalCode;
    address1Input.value = address1;
    address2Input.value = address2;
  }
  //local storage에서 가져오기
  const orderInfo = JSON.parse(localStorage.getItem('order'));
  orderItemAll.innerHTML = orderInfo.orderItems.reduce((acc, cur) => {
    acc += `${cur.title} / ${cur.quantity}개 <br>`;
    return acc;
  }, '');
  orderPrice.innerHTML = orderInfo.totalPrice;
  totalPrice.innerHTML = orderInfo.totalPrice + 3000;
}

function requestSelectEvent(e) {
  let target = e.target;

  if (target.value != '6') {
    requestInput.disabled = true;
  } else {
    requestInput.disabled = false;
  }
}

async function orderConfirmEvent(e) {
  let request = '';
  if (requestSelectBox.value == '6') {
    request = requestInput.value;
  } else {
    let caseOfRequest = requestSelectBox.value;
    let requestArr = [
      '요청 사항 없음',
      '직접 수령',
      '배송 전 연락',
      '부재 시 경비실',
      '부재 시 문 앞',
      '부재 시 택배함',
    ];
    request = requestArr[parseInt(caseOfRequest)];
  }

  const orderInfo = JSON.parse(localStorage.getItem('order'));

  let data = {
    orderItems: orderInfo.orderItems,
    totalPrice: orderInfo.totalPrice,
    request,
    address: {
      postalCode: postalCodeInput.value,
      address1Input: address1Input.value,
      address2Input: address2Input.value,
    },
    receiver: fullNameInput.value,
    phoneNumber: phoneNumberInput.value,
  };
  let result;
  if (!sessionStorage.getItem('accessToken')) {
    result = await Api.post('/api/orders', true, data);
  } else {
    result = await Api.post('/api/orders', false, data);
  }
  let orderId = result._id;
  localStorage.setItem('orderID', orderId);
  localStorage.removeItem('order');
  location.href = '/order-confirm';
}

searchAddress.addEventListener('click', handleSearchAddressClick);

function handleSearchAddressClick(e) {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.value = '';
      address2Input.focus();
    },
  }).open();
}
