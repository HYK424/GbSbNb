const itemList=document.querySelector('.itemList');

async function getItems(){
const posts=await fetch('http://localhost:3000/api/products');
const itemLists=await posts.json();
return itemLists
}


async function innerItemList(i){
    const obj=await i;
    
    for(let i=0; i<obj.products.length; i++){
     itemList.insertAdjacentHTML('beforeend',`
        <div class="posts" id="posts${i}">
        <a class="a" href="/api/products/${obj.products[i]._id}">
          <img src=${obj.products[i].imageUrl} alt="">
            <ul>
              <li><span>제품명: ${obj.products[i].title}</span> </li>
              <li>제조사: ${obj.products[i].manufacturer}</li>
              <li><span>가격: <strong>${obj.products[i].price}</strong> 원</span> </li>
              <li>수정 날짜: ${obj.products[i].createdAt}</li>
              </a>
              <button class="btn btn-outline-danger" id="itemDelete${i}">삭제</button>
              <a href="/admin/products/${obj.products[i]._id}?edit=true"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
              </a></ul>
        </div>
  `);
  deleteItem(obj.products[i], i);
      }
    }
  
 function deleteItem(obj, i){
    const btn=document.querySelector(`#itemDelete${i}`);
    const div=document.querySelector(`#posts${i}`);
    btn.addEventListener('click',()=>{
        div.remove();
       fetch(`http://localhost:3000/api/products/${obj._id}`,{
             method : "PUT", body: JSON.stringify({ delete: 'yes' }),
             headers: { 'Content-Type': 'application/json' },}
        )});
    }

innerItemList(getItems());

function goPost(){
    const login="/admin/post";
    location.href=login;
  }