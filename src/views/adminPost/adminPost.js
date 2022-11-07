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

const select = form.querySelector('.select');

thumbnailInput.addEventListener('change', handleFiles, false);
function handleFiles() {
  file = this.files[0];
}

adminPostOrPut();

async function adminPostOrPut() {
  if (!getProductId().length) {
    handleGetCategories();
    form.addEventListener('submit', adminPost);
    form2.addEventListener('submit', categoryPost);
  } else {
    handleGetCategories();
    inputPosts();
    form.addEventListener('submit', adminPut);

  }
}

//FormData생성
function formData() {
  const title = titleInput.value;
  const manufacturer = manufactureInput.value;
  const price = priceInput.value;
  const description = descriptionInput.value;
  const image = file;
  const category = select.options[select.selectedIndex].value;

  const data = new FormData();
  data.enctype = 'multipart/form-data';
  data.append('title', title);
  data.append('category', category);
  data.append('manufacturer', manufacturer);
  data.append('price', price);
  data.append('description', description);
  data.append('image', image);
  return data;
}

//빈 input에 채우기
async function inputPosts() {
  form2.style.visibility = 'hidden';
  const data = await (await fetch(`/api/products/${getProductId()}`)).json();

  titleInput.value = data.title;
  manufactureInput.value = data.manufacturer;
  priceInput.value = data.price;
  descriptionInput.value = data.description;
  select.insertAdjacentHTML('afterbegin', `
  <option selected value="${data.category}">${data.category}</option>
  `);
  // thumbnailInput.value = productData.imageUrl; 보안 상 이유로 구현 불가
}
//리셋
function reset() {
  form.reset();
}

//productsId반환
function getProductId() {
  return window.location.pathname.split('/')[3];
}

//카테고리들 가져오면서 원래 있던 옵션에 카테고리들 추가
async function handleGetCategories() {
  const categories = await fetch('/api/categories')
    .then(res => res.json());

  async function updateOptions(categories) {
    // 카테고리 옵션 추가

    console.log(categories);
    categories.forEach((category) => {
      select.insertAdjacentHTML('beforeend', `
      <option value="${category.name}">${category.name}</option>
      `);
    })
  }
  
  updateOptions(categories);
};

async function adminPut(event) {
  event.preventDefault();
  //productsId에 해당하는 상품 상세 정보 가져와서 조작
  try {
    await fetch(`/api/products/${getProductId()}`, {
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
    await fetch('/api/products', {
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