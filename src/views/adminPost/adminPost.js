const form = document.querySelector('#form');
const titleInput = form.querySelector('.title');
const categoryInput = form.querySelector('.category');
const manufactureInput = form.querySelector('.manufacturer');
const priceInput = form.querySelector('.price');
const descriptionInput = form.querySelector('.description');
const thumbnailInput = form.querySelector('#formFile');
let file;

thumbnailInput.addEventListener('change', handleFiles, false);
function handleFiles() {
  file = this.files[0];
}

async function adminPostOrPut() {
  if (!adminPostPath().length) {
    form.addEventListener('submit', adminPost);
  } else {
    const product = await fetch(`http://localhost:3000/api/products/${adminPostPath()}`)
    const productData = await product.json();
    inputPosts(productData);
    form.addEventListener('submit', adminPut);
  }
}

//FormData생성
function formData() {
  const title = titleInput.value;
  const categoryId = categoryInput.value;
  const manufacturer = manufactureInput.value;
  const price = priceInput.value;
  const description = descriptionInput.value;
  const image = file;

  const data = new FormData();
  data.enctype = 'multipart/form-data';
  data.append('title', title);
  data.append('categoryId', categoryId);
  data.append('manufacturer', manufacturer);
  data.append('price', price);
  data.append('description', description);
  data.append('image', image);

  return data;
}

//리셋
function reset() {
  form.reset();
}

//productsId반환
function adminPostPath() {
  return window.location.pathname.split('/')[3];
}

//빈 input에 채우기
function inputPosts(data) {
  titleInput.value = data.title;
  categoryInput.value = data.categoryId;
  manufactureInput.value = data.manufacturer;
  priceInput.value = data.price;
  descriptionInput.value = data.description;
  // thumbnailInput.value = productData.imageUrl; 보안 상 이유로 구현 불가
}

async function adminPut(event) {
  event.preventDefault();
  //productsId에 해당하는 상품 상세 정보 가져와서 조작
  try {
    await fetch(`http://localhost:3000/api/products/${adminPostPath()}`, {
      method: 'PUT',
      body: formData(),
    })
  } catch (error) {
    console.log(error);
  }
}

async function adminPost(event) {
  event.preventDefault();
  try {
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: formData(),
    })
      .then(reset());
  } catch (error) {
    console.log(error);
  }
}

adminPostOrPut();