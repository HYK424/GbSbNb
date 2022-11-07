const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const cartBtn = document.getElementById('addCart');
const countElement = document.getElementById('count');
const cartNotification = document.getElementById('cartNotification');

cartBtn.addEventListener('click', handleCartBtnClick);
minusBtn.addEventListener('click', handleMinusBtnClick);
plusBtn.addEventListener('click', handlePlusBtnClick);

function handleMinusBtnClick() {
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

async function handleCartBtnClick() {
  const productId = window.location.pathname.split('/')[2];
  const quantity = Number(countElement.value);
  const newItem = { productId, quantity };
  const cartItems = ((stringifiedCart) => JSON.parse(stringifiedCart))(
    localStorage.getItem('cart') || JSON.stringify([]),
  );
  const itemIndex = cartItems.findIndex((item) => item.productId === productId);

  if (itemIndex >= 0) {
    cartItems[itemIndex].quantity += quantity;
  } else {
    cartItems.push(newItem);
  }
  const updatedCartItems = JSON.stringify(cartItems);
  if (sessionStorage.getItem('token')) {
    await fetch('/api/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
  localStorage.setItem('cart', updatedCartItems);
  updateCartNotification(cartItems.length);
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
