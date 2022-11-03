const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const cartBtn = document.querySelector('#addCart');
const countElement = document.querySelector('#count');

const title = document.querySelector('#title');
const image = document.querySelector('#image');
const price = document.querySelector('#price');
const category = document.querySelector('#category');
const manufacturer = document.querySelector('#manufacturer');
const description = document.querySelector('#description');

const handleminusBtnClick = () => {
  let count = Number(countElement.value);
  if (count <= 1) return;
  count--;
  countElement.value = count;
};

const handlePlusBtnClick = () => {
  let count = Number(countElement.value);
  count++;
  countElement.value = count;
};

const handleCartBtnClick = (event) => {
  const count = Number(countElement.innerText);
};

cartBtn.addEventListener('click', handleCartBtnClick);
minusBtn.addEventListener('click', handleminusBtnClick);
plusBtn.addEventListener('click', handlePlusBtnClick);

const fetchProductInfo = async () => {
  console.log(location);
  const productId = window.location.pathname.split('/')[2];
  const res = await fetch(`/api/products/${productId}`, {
    method: 'GET',
  });
  const data = await res.json();
  title.innerText = data.title;
  image.src = data.imageUrl;
  price.innerText = `${data.price.toLocaleString()}원`;
  category.innerText = data.categoryId;
  manufacturer.innerText = data.manufacturer;
  description.innerText = data.description;
};

fetchProductInfo();
