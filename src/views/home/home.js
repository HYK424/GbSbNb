const search=document.querySelector(".search");
const form=document.querySelector(".formDiv");
const cancel=document.querySelector(".cancel");

const login="/login";
const register="/register";
const item="/"

function goLogin(){
  location.href=login;
}

function goRegister(){
  location.href=register;
}

function goItem(){
  location.href=item;
}

search.addEventListener('click',()=>{
  // debugger
  form.classList.toggle('active');
});

cancel.addEventListener('click', ()=>{
  form.classList.toggle('active');
});
