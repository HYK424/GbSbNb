import * as cartDB from "./cart_db.js";
import * as cartTempDB from "./cart_temp_db.js";

const itemCountAll = document.querySelector('#itemCountAll');
const itemPriceAll = document.querySelector('#itemPriceAll');
const totalPrice = document.querySelector('#totalPrice');

addAllElements();
addAllEvents();

function addAllElements() {
    insertProductsfromCart();
}

async function insertProductsfromCart() {
    const cartItems = cartDB.getItemAll();
    for (let item of cartItems) {
        let { productId, quantity } = item;
        let itemGet = await Api.get("/api/products", productId);
        let { price, title, imageUrl } = itemGet;

        const itemContainer = document.querySelector("#itemContainer");
        const itemHTML = `<div class="item-div" id="productItem-${productId}">
        <label class="checkbox">
            <input type="checkbox" id="checkbox-${productId}" checked>
        </label>
        <button class="delete-button" id="delete-${productId}">
            지우기
        </button>
        <img
            id="image-${productId}"
            src="${imageUrl}"
            alt="product-image"
        />
        <p id="title-${productId}">${title}</p>
        <p id="unitPrice-${productId}">${price}</p>
        <p>원</p>
        <button class="button" id="minus-${productId}" ${quantity <= 1 ? "disabled" : ""}>
            -
        </button>
        <input class="input" id="quantityInput-${productId}" type="number" min="1" max="99" value="${quantity}"/>
        <button class="button" id="plus-${productId}" ${quantity >= 99 ? "disabled" : ""}>
            +
        </button>
        <p id="totalPrice-${productId}">${quantity * price}원</p>
    </div>`;

        itemContainer.insertAdjacentHTML("beforeend", itemHTML);

        document
            .querySelector(`#delete-${productId}`)
            .addEventListener("click", () => deleteItem(productId));

        document
            .querySelector(`#checkbox-${productId}`)
            .addEventListener("change", () => toggleItem(productId));

        document
            .querySelector(`#plus-${productId}`)
            .addEventListener("click", () => increaseItemQuantity(productId));

        document
            .querySelector(`#minus-${productId}`)
            .addEventListener("click", () => decreaseItemQuantity(productId));

        document
            .querySelector(`#quantityInput-${productId}`)
            .addEventListener("change", () => handleQuantityInput(productId));
    }
}

async function deleteItem(id) {
    cartDB.deleteItem(id);

    // 결제정보를 업데이트함.
    cartTempDB.deleteItem(id);
    updateBill()

    // 제품 요소(컴포넌트)를 페이지에서 제거함
    document.querySelector(`#productItem-${id}`).remove();

    // 전체선택 체크박스를 업데이트함
}

function updateBill() {
    itemCountAll.innerHTML = cartTempDB.getTotalCount()
    itemPriceAll.innerHTML = cartTempDB.getTotalPrice()
    totalPrice.innerHTML = cartTempDB.getTotalPrice() + 3000
}

async function increaseItemQuantity() {
    const newQuantity = '';
}