
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
  select.insertAdjacentHTML(
    'afterbegin',
    `
  <option selected value="${data.category}">${data.category}</option>
  `,
  );
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
    }).join('');
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
    }).then(location.href = '/admin');
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
    }).then(reset.form());
  } catch (error) {
    console.log(error);
  }
}

async function categoryPost(event) {
  event.preventDefault();
  const categoryid = categoryIdIn.value;
  const categoryname = categoryNameIn.value;

  await Api.post('/api/categories', false, { id: categoryid, name: categoryname })
    .then(reset.PostForm())
    .then(location.reload);
}

async function categoryDelete(event) {
  event.preventDefault();

  const Category = select[1].options[select[1].selectedIndex];

  console.log(Category);

  let isConfirmed = false;

  const result = await Api.get('/api', `products?q=${Category.value}`, false);

  if (result.products.length != 0) {
    isConfirmed = confirm(
      `해당 카테고리에는 ${result.products.length}개의 상품이 있습니다.\n정말 삭제 하시겠습니까?`,
    );
  }
  console.log(result.products[0]._id);
  if (isConfirmed) {
    let count = 0;

    for (let i in result.products) {
      const send = await Api.delete('/api/products', result.products[i]._id);
      console.log(send);
      if (send.messege) {
        count += 1;
      }
    }
    if (count === result.products.length) {
      alert(`총 ${count}회의 반복동작 작동됨`);
    }

    /* 현재 위 구현은 올바른 방식이 아니라고 판단됨
    '카테고리'를 삭제하는 방식이 아닌 해당 카테고리 안에 있는 product 데이터를 삭제하는 방식으로 구현하였음.
    
    Category에 해당하는 항목에서 value 와 id값을 가지고 오는데 이를 처리할 카테고리 관련 라우터가 인국 라우터에는 존재하지않음

    그때문에 일단 productRouter에 있는 

    productRouter.delete('/:productId',
    
    로 작성되 있는 라우터를 사용하였음.

    1.Category 항목을 받아온다.

    2. 일단 Api.get을 사용하여 카테고리에 해당되는 값을 가져온다. 
      (카테고리 이름을 넣고 이 이름과 같은 categoryName을 가진 물건의 목록을 반환 받는다)
      !!개발자도구 콘솔을 참조 ( 9 라는 숫자 위의 값이 이 파일 190번줄의 값이다)

    3. 예상으로는 그 다음으로는 카테고리를 삭제하여야 하는데 현재 카테고리의 id값을 받아올 수 없기때문에
      단순 예시로 받아온 목록내용물의 갯수 만큼 for문을 돌려 해당 내용물들을 삭제시킨다 
      ( 실제 삭제 안됨. 백엔드 컨트롤러단에서 강제적 반환을 시켜뒀음 )
    
    4. 모든 데이터가 올바르게 삭제된다면 중간에 멈추지 않는다.

    5. 만약 중간에 멈춘다면 public/js/response-handeler.js가 작동하여 에러를 뱉어 준다.

    6. for문에 작성하지 않았지만 if(!send.messege) 즉 messege 값을 반환받지 못한다면
    이를 처리하는 로직을 이 파일에 작성할 필요가 있다.

    */
  }

  // try {
  //   const deleteCheck = await (
  //     await fetch(`/api/products?q=${Category.value}`)
  //   ).json();
  //   isConfirmed = confirm(
  //     `해당 카테고리에는 ${deleteCheck.products.length}개의 상품이 있습니다. 정말 삭제하시겠습니까?`,
  //   );
  // } catch (error) {
  //   isConfirmed = confirm('해당 카테고리에는 0개의 아이템이 있습니다');
  //   console.log(error);
  // }
  // if (isConfirmed) {
  //   try {
  //     await fetch(`/api/categories/${Category.id}`, {
  //       method: 'DELETE',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // } else {
  // }
}

async function categoryPut(event) {
  event.preventDefault();

  const selectPutId = categoryPutIdIn.value;
  const selectPutName = categoryPutNameIn.value;
  const categoryId = select[2].options[select[2].selectedIndex].id;

  await Api.put(`/api/categories/`, categoryId, {
    id: selectPutId,
    name: selectPutName,
  }).then(reset.PutForm());

}