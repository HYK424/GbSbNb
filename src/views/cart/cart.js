const productInCartList = [
  {
    img: '../../../images/views/cart/cartTempImage.jpeg',
    name: '하얀 니트와 청반바지',
    price: 50000,
    quantity: 1,
    option: 'small',
  },
  {
    img: '../../../images/views/cart/cartTempImage.jpeg',
    name: '하얀 니트와 청반바지',
    price: 50000,
    quantity: 2,
    option: 'small',
  },
  {
    img: '../../../images/views/cart/cartTempImage.jpeg',
    name: '하얀 니트와 청반바지',
    price: 50000,
    quantity: 3,
    option: 'small',
  },
  {
    img: '../../../images/views/cart/cartTempImage.jpeg',
    name: '하얀 니트와 청반바지',
    price: 50000,
    quantity: 2,
    option: 'small',
  },
  {
    img: '../../../images/views/cart/cartTempImage.jpeg',
    name: '하얀 니트와 청반바지',
    price: 50000,
    quantity: 2,
    option: 'small',
  },
  {
    img: '../../../images/views/cart/cartTempImage.jpeg',
    name: '하얀 니트와 청반바지',
    price: 50000,
    quantity: 2,
    option: 'small',
  },
];

const fetchFake = (url, payload) =>
  new Promise((resolve, reject) => resolve(productInCartList));

const fetchProductInCart = async () => {
  const data = await fetchFake(URL);
  return data;
};

let totalPrice = 0;

const renderProductInCartListAndTotalPrice = () => {
  const itemList = fetchProductInCart();
  itemList.then(
    (data) =>
      (document.getElementById('itemDiv').innerHTML = data
        .map(
          (item) =>
            `<div class="item">
            <input type="checkbox" name="checkBox" class="checkBox"/>
            <div class="itemBox">
              <img class="image" src=${item.img}>
              <div class="info">
                <div class="name">${item.name}</div>
                <div class="price">${item.price} won</div>
                <div class="quantity">${item.quantity}</div>
                <div class="option">${item.option}</div>
              </div>
            </div>
          </div>`,
        )
        .join('')),
  );

  itemList.then((data) => {
    data.map((item) => {
      totalPrice = item.quantity * item.price;
    });
  });

  document.getElementById(
    'totalPrice',
  ).innerHTML = `총 주문 가격 + 배송비 : ${totalPrice} + 2500 = <b>${
    totalPrice + 2500
  }</b>원`;
};

renderProductInCartListAndTotalPrice();

const selectAllCheckBox = document.getElementById('selectAll');
selectAllCheckBox.addEventListener('click', function () {
  const checkboxes = document.getElementsByName('checkBox');
  for (let checkbox of checkboxes) {
    checkbox.checked = this.checked;
  }
});
