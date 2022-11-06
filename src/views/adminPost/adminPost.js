const form = document.querySelector('#form');
const form2 = document.querySelector('#form2');
const titleInput = form.querySelector('#title');
const categoryInput = form.querySelector('#category');
const manufactureInput = form.querySelector('#manufacturer');
const priceInput = form.querySelector('#price');
const descriptionInput = form.querySelector('#description');
const thumbnailInput = form.querySelector('#formFile');

const categoryNameInput = form2.querySelector('#categoryName');
const categoryIdInput = form2.querySelector('#categoryId');
let file;

const categoryOption = form.querySelector('.category');

thumbnailInput.addEventListener('change', handleFiles, false);
function handleFiles() {
  file = this.files[0];
}

adminPostOrPut();

async function adminPostOrPut() {
  if (!adminPostPath().length) {
    form.addEventListener('submit', adminPost);
    form2.addEventListener('submit', categoryPost);
  } else {
    const product = await fetch(`http://localhost:3000/api/products/${adminPostPath()}`)
    const productData = await product.json();
    inputPosts(productData);
    form.addEventListener('submit', adminPut);
    form2.style.display = 'none';

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

//빈 input에 채우기
function inputPosts(data) {
  titleInput.value = data.title;
  categoryInput.value = data.categoryId;
  manufactureInput.value = data.manufacturer;
  priceInput.value = data.price;
  descriptionInput.value = data.description;

  // thumbnailInput.value = productData.imageUrl; 보안 상 이유로 구현 불가
}
//리셋
function reset() {
  form.reset();
}

//productsId반환
function adminPostPath() {
  return window.location.pathname.split('/')[3];
}

async function handleGetCategories() {
  const res = await fetch(/api/categories, {
    method: 'GET',
  });
  const categories = await res.json();

  async function updateOptions(categories) {
    // 카테고리 옵션 추가
    console.log(categories);
    categories.forEach((category) => {
      categoryOption.insertAdjacentHTML('beforeend', `
      <option value="${category}">${category}</option>
      `);
    })
  }
  updateOptions(categories);
};




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

async function categoryPost(event) {
  event.preventDefault();
  const categoryid = categoryIdInput.value;
  const categoryname = categoryNameInput.value;

  try {
    await fetch('/api/categories', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: categoryid,
        name: categoryname,
      })
    }).then(reset());
  }
  catch (error) {
    console.log(error);
  }
}

