import * as Api from '/api.js';

const itemList = document.querySelector('.itemList');
const itemCategory = document.querySelector('.form-select-sm');
const form = document.querySelector('#form');
const select = document.getElementById('select');

setCategory();
setItemList();

allEvents();

function allEvents() {
  select.addEventListener('change', handleSelect);
}

async function setCategory() {
  //카테고리 가져오기
  const setCategory = await (
    await fetch('/api/categories', {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Expires: 0,
      },
    })
  ).json();
  //카테고리에 option 추가
  itemCategory.insertAdjacentHTML(
    'beforeend',
    setCategory
      .map((item) => {
        return `
    <option value="${item.name}">${item.name}</option>
    `;
      })
      .join(''),
  );
}


function productsTemplate(obj) {
  itemList.innerHTML = obj
    .map((products, i) => {
      return `
  <div class="posts" id="posts${products._id}">
  <a class="a" href="/products/${products._id}">
    <img src=${products.imageUrl} alt="">
      <ul>
        <li><span>제품명: ${products.title}</span> </li>
        <li>제조사: ${products.manufacturer}</li>
        <li><span>가격: <strong>${products.price}</strong> 원</span> </li>
        <li>수정 날짜: ${products.createdAt}</li>
        </a>
        <button type="button" class="btn ${products.view ? 'btn-outline-primary' : 'btn-outline-secondary'
        } vtn" id="${products._id}">
        ${products.view ? '공개' : '비공개'} </button>
       
        <a href="/admin/products/${products._id
        }"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
        </a>
        <button class="btn btn-outline-danger dtn" id="itemDelete${i}" name="${products._id}">삭제</button>
        
        <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
        </ul>
  </div>
`;
    })
    .join('');

    document.querySelector('.posts').addEventListener('click',(event)=>{
      if(event.target.className=='vtn'){
        changeView;
      }else if(event.target.className=='dtn'){
        deleteView;
      }
      
      });

  // const vtn = document.querySelectorAll('.vtn');
  // for (const btn of vtn) {
  //   btn.addEventListener('click', changeView);
  // }

  // const dtn = document.querySelectorAll('.dtn');
  // for (const btn of dtn) {
  //   btn.addEventListener('click', deleteView);
  // }
}




async function setItemList() {

  const obj = await Api.get('/api/admin/products');
 

  //최초 1회 전체 상품 노출
  if (obj.err) {
    alert('에러가 있습니다');
    return;
  }
  console.log(obj);
  console.log(obj.products);

  productsTemplate(obj.products);
}

async function handleSelect(event) {
  event.preventDefault();
  const selectItem =
    document.getElementById('select').options[select.selectedIndex].value;
  if (selectItem == 'all') {
    const obj = await Api.get('/api/admin/products');
  
    productsTemplate(obj.products);
  } else {
    const link = `products?q=${selectItem}`;
    const obj = await Api.get(`/api/admin`, link);
 
    productsTemplate(obj.products);
  }
}

async function changeView(event) {
  const viewId = event.target.id;
  const btn = document.getElementById(`${viewId}`);

  
  if (btn.classList[1] == 'btn-outline-primary') {
    btn.classList.replace('btn-outline-primary', 'btn-outline-secondary');
    btn.innerText = '비공개';

    putView(viewId, '비공개');

    putView(viewId, false);
  } else {
    btn.classList.replace('btn-outline-secondary', 'btn-outline-primary');
    btn.innerText = '공개';
    putView(viewId, true);
  }
  async function putView(viewId) {
    await Api.get(`/api/admin/products/${viewId}/private`);
  }
}

async function deleteView(event){
  const deleteId=event.target.name;
  console.log(deleteId);
  console.log(event.target);
  const result=await Api.delete(`/api/admin/products`, deleteId);
  console.log(result);
  if(result.err){ 
    return;
  }
  const idd=document.getElementById(`posts${deleteId}`);
  console.log(idd);
  alert(result.message);
  idd.remove();
}
