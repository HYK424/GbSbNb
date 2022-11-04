const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const cartBtn = document.querySelector('#addCart');
const countElement = document.querySelector('#count');
const cartNotification = document.querySelector('#cartNotification');

cartBtn.addEventListener('click', handleCartBtnClick);
minusBtn.addEventListener('click', handleminusBtnClick);
plusBtn.addEventListener('click', handlePlusBtnClick);

function handleminusBtnClick() {
  let count = Number(countElement.value);
  if (count <= 1) return;
  count--;
  countElement.value = count;
}

function handlePlusBtnClick() {
  let count = Number(+countElement.value);
  count++;
  countElement.value = count;
}

function handleCartBtnClick() {
  const productId = window.location.pathname.split('/')[2];
  const quantity = Number(countElement.value);
  console.log(quantity);
  const newItem = { productId, quantity };
  if (!localStorage.getItem('cart')) {
    const emptyArray = [];
    localStorage.setItem('cart', JSON.stringify(emptyArray));
  }
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  console.log(cartItems);
  const updatedCartItems = [...cartItems];
  const itemIndex = cartItems.findIndex((item) => item.productId === productId);

  if (itemIndex >= 0) {
    updatedCartItems[itemIndex].quantity += quantity;
  } else {
    updatedCartItems.push(newItem);
  }
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  updateCartNotification(updatedCartItems.length);
}

function updateCartNotification(cartItemsTotalCount) {
  cartNotification.innerHTML = `
    장바구니
    <span
      class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger"
      id="cart-notification"
    >
      ${cartItemsTotalCount}
      <span class="visually-hidden">unread messages</span>
    </span>`;
}
