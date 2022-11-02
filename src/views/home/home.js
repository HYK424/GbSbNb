<<<<<<< Updated upstream
// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from "/api.js";
import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const landingDiv = document.querySelector("#landingDiv");
const greetingDiv = document.querySelector("#greetingDiv");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener("click", alertLandingText);
  greetingDiv.addEventListener("click", alertGreetingText);
}

function insertTextToLanding() {
  landingDiv.insertAdjacentHTML(
    "beforeend",
    `
      <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
    `
  );
=======

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
>>>>>>> Stashed changes
}
function goItem(){
  const cart="/cart"
  location.href=cart;
}

function insertTextToGreeting() {
  greetingDiv.insertAdjacentHTML(
    "beforeend",
    `
      <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
    `
  );
}

<<<<<<< Updated upstream
function alertLandingText() {
  alert("n팀 쇼핑몰입니다. 안녕하세요.");
}

function alertGreetingText() {
  alert("n팀 쇼핑몰에 오신 것을 환영합니다");
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get("/api/user/data");
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
=======
cancel.addEventListener('click', ()=>{
  form.classList.toggle('active');
});
>>>>>>> Stashed changes
