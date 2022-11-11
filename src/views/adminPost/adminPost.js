import * as Api from '/api.js';

const form = document.querySelector('#form');
const categoryPostForm = document.querySelector('#form2');
const categoryDeleteForm = document.querySelector('#form3');
const categoryPutForm = document.querySelector('#form4');

const categoryContainer = document.querySelector('#hidden');
const titleIn = form.querySelector('#title');
const manufactureIn = form.querySelector('#manufacturer');
const priceIn = form.querySelector('#price');
const descriptionIn = form.querySelector('#description');
const thumbnailIn = form.querySelector('#formFile');

const categoryNameIn = categoryPostForm.querySelector('#categoryName');
const categoryIdIn = categoryPostForm.querySelector('#categoryId');

const categoryPutNameIn = categoryPutForm.querySelector('#selectPutName');
const categoryPutIdIn = categoryPutForm.querySelector('#selectPutId');

let file;
let imageUrl;
const select = document.querySelectorAll('.form-select');

thumbnailIn.addEventListener('change', handleFiles);

async function handleFiles() {
  document.getElementById('disableBtn').disabled = true;
  file = this.files[0];
  let imageForm = new FormData();
  imageForm.enctype = 'multipart/form-data';
  imageForm.append('image', file);
  imageUrl = await (
    await fetch('/api/products/upload-image', {
      method: 'POST',
      body: imageForm,
    })
  ).json();
  document.getElementById('disableBtn').disabled = false;

  console.log(imageUrl);
}

handleGetCategories();
adminPostOrPut();

async function adminPostOrPut() {
  if (!getProductId().length) {
    form.addEventListener('submit', adminPost);
    allCategoriesEvent();
  } else {
    categoryContainer.style.display = 'none';
    document.querySelector('h2').innerText = '상품 수정';
    document.querySelector('.btnInput').setAttribute('value', '수정');
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
  const title = titleIn.value;
  const manufacturer = manufactureIn.value;
  const price = priceIn.value;
  const description = descriptionIn.value;
  const category = select[0].options[select[0].selectedIndex].value;
  const data = {
    title,
    manufacturer,
    price,
    description,
    category,
    imageUrl,
  };
  return data;
}

//빈 input에 채우기
async function innerPutForm() {
  const data = await (await fetch(`/api/products/${getProductId()}`)).json();
  titleIn.value = data.title;
  manufactureIn.value = data.manufacturer;
  priceIn.value = data.price;
  descriptionIn.value = data.description;
  select.insertAdjacentHTML(
    'afterbegin',
    `
  <option selected value="${data.category}">${data.category}</option>
  `,
  );
}
async function innerCategoryPostForm(event) {
  event.preventDefault();
  categoryPutIdIn.value = select[2].options[select[2].selectedIndex].id;
  categoryPutNameIn.value = select[2].options[select[2].selectedIndex].value;

  console.log(select[2].options[select[2].selectedIndex].id);
}
const reset = {
  form: () => {
    form.reset();
  },
  PostForm: () => {
    categoryPostForm.reset();
  },
  PutForm: () => {
    categoryPutForm.reset();
  },
};

function getProductId() {
  return window.location.pathname.split('/')[3];
}

async function handleGetCategories() {
  const categories = await (await fetch('/api/categories')).json();

  async function updateOptions(categories) {
    const categoryTempleate = categories
      .map((category) => {
        return `
      <option value="${category.name}" id="${category.id}">${category.name}</option>
      `;
      })
      .join('');
    select.forEach((item) => {
      item.insertAdjacentHTML('beforeend', categoryTempleate);
    });
  }
  updateOptions(categories);
}

async function adminPut(event) {
  event.preventDefault();
  const data = formData();
  const result = await Api.put(
    `/api/admin/products/${getProductId()}`,
    '',
    data,
  );
  if (result.err) {
    return;
  }
  alert('상품이 정상적으로 수정되었습니다 😊');
  location.href = '/admin/products/';
}

async function adminPost(event) {
  event.preventDefault();
  const result = await Api.post('/api/admin/products', false, formData());
  if (result.err) {
    return;
  }
  alert('상품이 정상적으로 등록되었습니다 😊');
  reset.form();
}

async function categoryPost(event) {
  event.preventDefault();
  const categoryid = categoryIdIn.value;
  const categoryname = categoryNameIn.value;

  const result = await Api.post('/api/admin/categories', false, {
    id: categoryid,
    name: categoryname,
  });
  if (result.err) {
    return;
  }
  alert('카테고리가 등록되었습니다');
  reset.PostForm();

  location.reload();
}

async function categoryDelete(event) {
  event.preventDefault();

  const Category = select[1].options[select[1].selectedIndex];

  const result = await Api.delete('/api/admin/categories', Category.id, false);

  if (result.err) {
    return;
  }
  alert('카테고리가 삭제되었습니다');
  location.reload();
}

async function categoryPut(event) {
  event.preventDefault();

  const selectPutId = categoryPutIdIn.value;
  const selectPutName = categoryPutNameIn.value;
  const categoryId = select[2].options[select[2].selectedIndex].id;

  const result = await Api.put(`/api/admin/categories/`, categoryId, {
    id: selectPutId,
    name: selectPutName,
  });
  if (result.err) {
    return;
  }
  alert('카테고리가 수정되었습니다');
  reset.PutForm();
  location.reload();
}
