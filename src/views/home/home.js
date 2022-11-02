const search = document.querySelector('.search');
const form = document.querySelector('.formDiv');
const cancel = document.querySelector('.cancel');

const login = '/login';
const register = '/register';
const item = '/';

console.log('체크1');
function goLogin() {
  location.href = login;
}
console.log('체크2');
function goRegister() {
  location.href = register;
}
console.log('체크3');
function goItem() {
  location.href = item;
}
console.log('체크4');
search.addEventListener('click', () => {
  // debugger
  form.classList.toggle('active');
});

cancel.addEventListener('click', () => {
  form.classList.toggle('active');
});
