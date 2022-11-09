// import { responseHandler } from '../public/js/response-handler';

const form = document.querySelector('#form');
const categoryPostForm = document.querySelector('#form2');
const categoryPutForm = document.querySelector('#form3');
const categoryDeleteForm = document.querySelector('#form4');

const categoryContainer = document.querySelector('#hidden');
const titleInput = form.querySelector('#title');
const categoryInput = form.querySelector('#category');
const manufactureInput = form.querySelector('#manufacturer');
const priceInput = form.querySelector('#price');
const descriptionInput = form.querySelector('#description');
const thumbnailInput = form.querySelector('#formFile');

const categoryNameInput = categoryPostForm.querySelector('#categoryName');
const categoryIdInput = categoryPostForm.querySelector('#categoryId');
let file;
const select = document.querySelectorAll('.form-select');

thumbnailInput.addEventListener('change', handleFiles, false);
function handleFiles() {
  file = this.files[0];
}

handleGetCategories();
adminPostOrPut();

async function adminPostOrPut() {
  if (!getProductId().length) {
    form.addEventListener('submit', adminPost);
    allCategoriesEvent();
  } else {
    categoryContainer.style.display = 'none';
    innerPutForm();
    form.addEventListener('submit', adminPut);
  }
}

function allCategoriesEvent() {
  select[2].addEventListener('change', innerCategoryPostForm);
  categoryPostForm.addEventListener('submit', categoryPost);
  categoryPutForm.addEventListener('submit', categoryPut);
  categoryDeleteForm.addEventListener('submit', categoryDelete);
}

//FormData생성
function formData() {
  const title = titleInput.value;
  const manufacturer = manufactureInput.value;
  const price = priceInput.value;
  const description = descriptionInput.value;
  const image = file;
  const category = select[0].options[select[0].selectedIndex].value;

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
async function innerPutForm() {
  const data = await (await fetch(`/api/products/${getProductId()}`)).json();
  titleInput.value = data.title;
  manufactureInput.value = data.manufacturer;
  priceInput.value = data.price;
  descriptionInput.value = data.description;
  select.insertAdjacentHTML(
    'afterbegin',
    `
  <option selected value="${data.category}">${data.category}</option>
  `,
  );
  // thumbnailInput.value = productData.imageUrl; 보안 상 이유로 구현 불가
}

async function innerCategoryPostForm() {
  const data = await await fetch('');
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
  const categories = await (await fetch('/api/categories')).json();

  async function updateOptions(categories) {
    // 카테고리 옵션 추가
    const categoryTempleate = categories.map((category) => {
      return `
      <option value="${category.name}" id="${category.id}">${category.name}</option>
      `;
    });
    select.forEach((item) => {
      item.insertAdjacentHTML('beforeend', categoryTempleate);
    });
  }
  updateOptions(categories);
}

async function adminPut(event) {
  event.preventDefault();
  //productsId에 해당하는 상품 상세 정보 가져와서 조작
  try {
    await fetch(`/api/products/${getProductId()}`, {
      method: 'PUT',
      body: formData(),
    });
    console.log(select[0].options[select[0].selectedIndex].value);
  } catch (error) {
    console.log(error);
  }
}

async function adminPost(event) {
  const result = await Api.post('/api/products', false, formData());
  alert(result.message);
  event.preventDefault();
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      body: formData(),
    }).then(reset());
    console.log(select[0].options[select[0].selectedIndex].id);
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: categoryid,
        name: categoryname,
      }),
    }).then(reset());
  } catch (error) {
    console.log(error);
  }
}

async function categoryDelete(event) {
  event.preventDefault();
  try {
    const deleteCategory = select[1].options[select[1].selectedIndex].id;

    await fetch(`/api/categories/${deleteCategory}`, {
      method: 'DELETE',
    }).then(reset());
  } catch (error) {
    console.log(error);
  }
}

async function categoryPut(event) {
  event.preventDefault();

  try {
    const selectPutId = document.querySelector('#selectPutId').value;
    const selectPutName = document.querySelector('#selectPutName').value;
    const showCategory = select[2].options[select[2].selectedIndex].id;

    await fetch(`/api/categories/${showCategory}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectPutId,
        name: selectPutName,
      }),
    }).then(reset());
  } catch (error) {
    console.log(error);
  }
}
