import * as cartDB from './cart_db.js';
import * as cartTempDB from './cart_temp_db.js';
import * as Api from '../api.js';

const itemCountAll = document.querySelector('#itemCountAll');
const itemPriceAll = document.querySelector('#itemPriceAll');
const totalPrice = document.querySelector('#totalPrice');
const itemContainer = document.querySelector('#itemContainer');
const allSelectCheckbox = document.querySelector('#allSelectCheckbox');
const partialDeleteLabel = document.querySelector('#partialDeleteLabel');
const submitButton = document.querySelector('#submitButton');

addAllElements();
addAllEvents();
updateSummary();

function addAllElements() {
    insertProductsfromCart();
}

function addAllEvents() {
    itemContainer.addEventListener('click', itemButtonEvent);
    itemContainer.addEventListener('change', itemInputEvent);
    allSelectCheckbox.addEventListener('change', toggleAllEvent);
    partialDeleteLabel.addEventListener('click', toggleDeleteEvent);
    submitButton.addEventListener('click', submitOrderEvent);
}

async function insertProductsfromCart() {
    const cartItems = cartDB.getItemAll();

    if (!cartItems) return;

    for (let item of cartItems) {
        let { productId, quantity } = item;
        let itemGet = await Api.get('/api/products', productId, true);
        let { price, title, imageUrl } = itemGet;

        const itemContainer = document.querySelector('#itemContainer');
        const itemHTML = `<div class="d-flex item-container m-3" id="productItem-${productId}">
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        data-action="checkbox"
                        data-id="${productId}"
                        id="checkbox-${productId}"
                        checked
                      />
                    </label>
                    <img
                      id="image-${productId}"
                      src="${imageUrl}"
                      alt="product-image"
                      class="image"
                    />
                    <p id="title-${productId}" class='title-container'>${title}</p>
                    <p id="unitPrice-${productId}">${price.toLocaleString(
      'ko-KR',
    )}원</p>
                    <div>
                    <button
                      class="button"
                      data-action="minus"
                      data-id="${productId}"
                      id="minus-${productId}"
                    >
                      -
                    </button>
                    <input
                      class="input"
                      data-action="quantityInput"
                      data-id="${productId}"
                      id="quantityInput-${productId}"
                      type="number"
                      min="1"
                      max="99"
                      value="${quantity}"
                    />
                    <button
                      class="button"
                      data-action="plus"
                      data-id="${productId}"
                      id="plus-${productId}"
                    >
                      +
                    </button>
                    </div>
                    <p id="totalPrice-${productId}">${(
      quantity * price
    ).toLocaleString('ko-KR')}원</p>
                    <button
                      class="delete-button"
                      data-action="delete"
                      data-id="${productId}"
                      id="delete-${productId}"
                    >
                    
                      지우기
                    </button>
                  </div>`;

        itemContainer.insertAdjacentHTML('beforeend', itemHTML);
        cartTempDB.insertItem(productId, title, quantity, price, true);
    }
    updateSummary();
}

function itemButtonEvent(e) {
    let target = e.target;
    if (target.tagName != 'BUTTON') return;

    let actionCase = target.dataset.action;
    let productId = target.dataset.id;
    let oldQuantity = 0;

    switch (actionCase) {
        case 'delete':
            cartDB.deleteItem(productId);
            cartTempDB.deleteItem(productId);
            document.querySelector(`#productItem-${productId}`).remove();
            // 전체선택 체크박스를 업데이트함
            if (cartTempDB.isAllChecked) {
                allSelectCheckbox.checked = true;
            }
            break;

        case 'minus':
            oldQuantity = cartTempDB.getItem(productId).quantity;

            if (oldQuantity <= 1) break;

            cartTempDB.updateItemQuantity(productId, oldQuantity - 1);

            document.querySelector(`#quantityInput-${productId}`).value =
                oldQuantity - 1;

            updateItemTotalPrice(productId);

            break;

        case 'plus':
            oldQuantity = cartTempDB.getItem(productId).quantity;

            if (oldQuantity >= 99) break;

            cartTempDB.updateItemQuantity(productId, oldQuantity + 1);
            document.querySelector(`#quantityInput-${productId}`).value =
                oldQuantity + 1;

            updateItemTotalPrice(productId);

            break;
    }

    updateSummary();
}

function itemInputEvent(e) {
    let target = e.target;
    if (target.tagName != 'INPUT') return;

    let actionCase = target.dataset.action;
    let productId = target.dataset.id;

    switch (actionCase) {
        case 'checkbox':
            let isChecked = target.checked;
            cartTempDB.updateItemChecked(productId, isChecked);
            if (isChecked) {
                if (cartTempDB.isAllChecked()) {
                    allSelectCheckbox.checked = true;
                }
            } else {
                allSelectCheckbox.checked = false;
            }

            break;

        case 'quantityInput':
            let newQuantity = target.value;

            if (newQuantity < 1 || newQuantity > 99) {
                return alert('수량은 1~99 사이만 가능합니다.');
            }

            cartTempDB.updateItemQuantity(productId, newQuantity);

            updateItemTotalPrice(productId);
            break;
    }

    updateSummary();
}

function toggleAllEvent(e) {
    const isChecked = e.target.checked;
    const itemIdArr = cartTempDB.getItemIdAll();

    for (let itemId of itemIdArr) {
        cartTempDB.updateItemChecked(itemId, isChecked);
        document.querySelector(`#checkbox-${itemId}`).checked = isChecked;
    }

    updateSummary();
}

function toggleDeleteEvent(e) {
    const itemCheckedAll = cartTempDB.getItemChecked();
    for (let item of itemCheckedAll) {
        document.querySelector(`#productItem-${item.productId}`).remove();
        cartTempDB.deleteItem(item.productId);
        cartDB.deleteItem(item.productId);
    }

    updateSummary();
}

function updateSummary() {
    itemCountAll.innerHTML = cartTempDB.getTotalCount().toLocaleString('ko-KR');
    itemPriceAll.innerHTML = cartTempDB.getTotalPrice().toLocaleString('ko-KR');
    totalPrice.innerHTML = (cartTempDB.getTotalPrice() + 3000).toLocaleString(
        'ko-KR',
    );
}

function updateItemTotalPrice(productId) {
    let itemTotalPriceInput = document.querySelector(`#totalPrice-${productId}`);
    let item = cartTempDB.getItem(productId);
    let { quantity, price } = item;
    let totalPrice = quantity * price;


    itemTotalPriceInput.innerHTML = Number(totalPrice).toLocaleString('ko-KR');
}

function submitOrderEvent(e) {
    let orderResult = {
        orderItems: cartTempDB.getItemChecked().map((item) => {
            let { productId, title, quantity } = item;
            return { productId, title, quantity };
        }),
        totalPrice: cartTempDB.getTotalPrice(),
    };
    localStorage.setItem('order', JSON.stringify(orderResult));

    for (let item of cartTempDB.getItemChecked()) {
        let { productId } = item;
        cartDB.deleteItem(productId);
    }
    // const orderFake = {
    //     orderItems: [{ title: '123', quantity: '123' }],
    //     totalPrice: '123',
    // }
    window.location.href = '/order'
}