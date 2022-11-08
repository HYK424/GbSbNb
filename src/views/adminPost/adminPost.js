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
const select = document.querySelectorAll('.form-select');

thumbnailIn.addEventListener('change', handleFiles, false);
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
  const title = titleIn.value;
  const manufacturer = manufactureIn.value;
  const price = priceIn.value;
  const description = descriptionIn.value;
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
  titleIn.value = data.title;
  manufactureIn.value = data.manufacturer;
  priceIn.value = data.price;
  descriptionIn.value = data.description;
  select.insertAdjacentHTML('afterbegin', `
  <option selected value="${data.category}">${data.category}</option>
  `);
  // thumbnailInput.value = productData.imageUrl; 보안 상 이유로 구현 불가
}

async function innerCategoryPostForm(event) {
  event.preventDefault();
  categoryPutIdIn.value = select[2].options[select[2].selectedIndex].id;
  categoryPutNameIn.value = select[2].options[select[2].selectedIndex].value;

  console.log(select[2].options[select[2].selectedIndex].id);
}


//리셋
const reset = {
  form: () => { form.reset() },
  PostForm: () => { categoryPostForm.reset() },
  PutForm: () => { categoryPutForm.reset() },
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
      `
    });
    select.forEach((item) => {
      item.insertAdjacentHTML('beforeend', categoryTempleate)
    });
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
    }).then(reset.form());

  } catch (error) {
    console.log(error);
  }
}

async function adminPost(event) {
  event.preventDefault();
  // const result = await Api.post('/api/products', false, formData());
  // alert(result.message);

  try {
    await fetch('/api/products', {
      method: 'POST',
      body: formData(),
    })
      .then(reset.form());

  } catch (error) {
    console.log(error);
  }
}

async function categoryPost(event) {
  event.preventDefault();
  const categoryid = categoryIdIn.value;
  const categoryname = categoryNameIn.value;

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
    }).then(reset.PostForm());
  }
  catch (error) {
    console.log(error);
  }
}

async function categoryDelete(event) {
  event.preventDefault();

  const Category = select[1].options[select[1].selectedIndex];

  let isConfirmed = false;
  try {
    const deleteCheck = await (await fetch(`/api/products?q=${Category.value}`)).json();
    isConfirmed = confirm(`해당 카테고리에는 ${deleteCheck.products.length}개의 상품이 있습니다. 정말 삭제하시겠습니까?`);
  } catch (error) {
    isConfirmed = confirm('해당 카테고리에는 0개의 아이템이 있습니다');
    console.log(error);
  }
  if (isConfirmed) {
    try {
      await fetch(`/api/categories/${Category.id}`, {
        method: "DELETE"
      })
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}

async function categoryPut(event) {
  event.preventDefault();
  try {
    const selectPutId = categoryPutIdIn.value;
    const selectPutName = categoryPutNameIn.value;
    const categoryId = select[2].options[select[2].selectedIndex].id;


    await fetch(`/api/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectPutId,
        name: selectPutName,
      }),
    }).then(reset.PutForm());
  } catch (error) {
    console.log(error);
  }
}
