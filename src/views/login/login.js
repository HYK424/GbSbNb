import * as Api from '../api.js';
const accessToken = sessionStorage.getItem('accessToken');
if (accessToken) {
  alert('이미 로그인하셨어요 :) 홈으로 보내드릴게요!');
  location.href = '/';
}

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const submitButton = document.getElementById('submitButton');
const sendEmail = document.getElementById('sendEmail');
const resetForm = document.getElementById('resetForm');
const resetInput = document.getElementById('resetInput');
const resetPhoneNuber = document.getElementById('resetPhoneNuber');

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
  if (result.err) {
    return;
  }

  console.log(result);

  sessionStorage.setItem('accessToken', result.tokens.accessToken);
  sessionStorage.setItem('refreshToken', result.tokens.refreshToken);
  sessionStorage.setItem('role', result.role);

  alert(result.message);

  window.location.href = '/';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const email = resetInput.value;
  const phoneNumber = resetPhoneNuber.value;
  const data = {
    email,
    phoneNumber,
  };
  const result = await Api.post(`/users/reset-password`, true, data);
  console.log(result);
  if (result.err) {
    return;
  }
  alert('비밀번호 초기화 성공! 이메일을 확인해주세요 😊');
}

function handleLinkClick() {
  resetForm.classList.remove('d-none');
}

sendEmail.addEventListener('click', handleLinkClick);
resetForm.addEventListener('submit', handleFormSubmit);
