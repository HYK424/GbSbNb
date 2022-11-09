import * as Api from '../api.js';

const accessToken = sessionStorage.getItem('accessToken');

if (accessToken) {
  alert('이미 로그인하셨어요 :) 홈으로 보내드릴게요!');
  location.href = '/';
}

// 요소(element), input 혹은 상수
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const submitButton = document.querySelector('#submitButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const data = { email, password };

  const result = await Api.post('/api/users/login', true, data);

  if (result) {
    sessionStorage.setItem('accessToken', result.tokens.accessToken);
    sessionStorage.setItem('refreshToken', result.tokens.refreshToken);

    console.log('안건너뜀');
    alert(result.message);

    window.location.href = '/';
  }
  console.log('건너뜀');
}
