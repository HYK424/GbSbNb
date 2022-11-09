import { validateEmail, validateTel } from '/useful-functions.js';

import * as Api from '../api.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const telInput = document.querySelector('#telInput');
const addressZipInput = document.querySelector('#addressZipInput');
const addressBasicInput = document.querySelector('#addressBasicInput');
const addressOptionInput = document.querySelector('#addressOptionInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const searchAddress = document.getElementById('searchAddress');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const phoneNumber = telInput.value;
  const postalCode = addressZipInput.value;
  const address1 = addressBasicInput.value;
  const address2 = addressOptionInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  // // 잘 입력했는지 확인
  // const isFullNameValid = fullName.length >= 2;
  // const isEmailValid = validateEmail(email);
  // const isTelValid = validateTel(phoneNumber);
  // const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  // if (!isFullNameValid || !isPasswordValid) {
  //   return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  // }

  // if (!isEmailValid) {
  //   return alert('이메일 형식이 맞지 않습니다.');
  // }

  // if (!isTelValid) {
  //   return alert('전화번호 형식이 맞지 않습니다.');
  // }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // 회원가입 api 요청
  // try {
  console.log(postalCode);
  const data = {
    fullName,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    address: {
      postalCode,
      address1,
      address2,
    },
  };

  const result = await Api.post('/api/users', true, data);

  if (result.err) {
    return;
  }

  alert(result.message);

  window.location.href = '/login';
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

      addressZipInput.value = data.zonecode;
      addressBasicInput.value = `${addr} ${extraAddr}`;
      addressOptionInput.placeholder = '상세 주소를 입력해 주세요.';
      addressOptionInput.focus();
    },
  }).open();
}
