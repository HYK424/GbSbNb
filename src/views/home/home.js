const search=document.querySelector(".search");
const form=document.querySelector(".formDiv");
const cancel=document.querySelector(".cancel");
const items=document.querySelectorAll(".item");

const json=JSON.stringify({
  "title": "인체공학 마우스",
  "price": 15000,
  "images": "./img/mouse.jpg",
  "link": "/"
});
const obj=JSON.parse(json);


function innerItemList(obj){
  const addItemList=`
  <a href=${obj.link}>
      <dl>
        <dt><img src=${obj.images} alt=""></dt>
        <dd>
          <ul>
            <li><span>${obj.title}</span> </li>
            <li><span><strong>${obj.price}</strong> 원</span> </li>
          </ul>
        </dd>
      </dl>
      </a>
`;

  for(let i=0; i<items.length; i++){
    if(!items[i].hasChildNodes()){
      items[i].innerHTML=addItemList;
      break;
    }
  }
return;
}

innerItemList(obj);

function goLink(link){
location.href=link;
}

function goLogin(){
  const login="/login";
  location.href=login;
}
function goRegister(){
  const register="/register";
  location.href=register;
}
function goItem(){
  const item="/"
  location.href=item;

}
function goItem(){
  const cart="/cart"
  location.href=cart;
}
cancel.addEventListener('click', ()=>{
  form.classList.toggle('active');
});