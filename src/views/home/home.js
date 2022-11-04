const search = document.querySelector(".search");
const form = document.querySelector(".formDiv");
const cancel = document.querySelector(".cancel");
const items = document.querySelectorAll(".item");

const json = JSON.stringify({
  "title": "인체공학 마우스",
  "price": 15000,
  "images": "./img/mouse.jpg",
  "link": "/"
});
const obj = JSON.parse(json);
console.log(sessionStorage.getItem('token'));
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0ZjFiZWQ2MGVmYzljZDU1ZDhjOGYiLCJyb2xlIjoiYmFzaWMtdXNlciIsImlhdCI6MTY2NzU2NTQzNiwiZXhwIjoxNjY3NTY1NDk2fQ.9Bx2A0K6o0ceIsNNFDHbakIUY9x9sOec6tp1yFPKtdQ
//토큰의 role에 따라 홈 화면이 다르게 보여지도록 구성


function innerItemList(obj) {
  const addItemList = `
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

  for (let i = 0; i < items.length; i++) {
    if (!items[i].hasChildNodes()) {
      items[i].innerHTML = addItemList;
      break;
    }
  }
  return;
}

innerItemList(obj);

function goLink(link) {
  location.href = link;
}

function goLogin() {
  const login = "/login";
  location.href = login;
}
function goRegister() {
  const register = "/register";
  location.href = register;
}
function goItem() {
  const item = "/"
  location.href = item;

}
function goItem() {
  const cart = "/cart"
  location.href = cart;
}
search.addEventListener('click', () => {
  form.classList.toggle('active');
});
cancel.addEventListener('click', () => {
  form.classList.toggle('active');
});