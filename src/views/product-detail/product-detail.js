const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const cartBtn = document.querySelector('#addCart');
const countElement = document.querySelector('#count');

const handleminusBtnClick = () => {
  let count = Number(countElement.value);
  if (count <= 1) return;
  count--;
  countElement.innerText = count;
};

const handlePlusBtnClick = () => {
  let count = Number(countElement.innerText);
  count++;
  countElement.innerText = count;
};

const handleCartBtnClick = (event) => {
  const count = Number(countElement.innerText);
  console.log(count);
};

cartBtn.addEventListener('click', handleCartBtnClick);
minusBtn.addEventListener('click', handleminusBtnClick);
plusBtn.addEventListener('click', handlePlusBtnClick);
