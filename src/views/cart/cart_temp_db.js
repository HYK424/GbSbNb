let cartTempDBArr = [];
let cartTotalPrice = 0
let cartTotalCount = 0

function insertItem(productId, quantity, price, isChecked) {
    let item = {
        productId,
        quantity,
        price,
        isChecked
    }

    if (isChecked) {
        cartTotalPrice += quantity * price
        cartTotalCount += quantity
    }

    cartTempDBArr.push(item)
}

function deleteItem(productId) {
    let itemDelete = cartTempDBArr.find(item => item.productId === productId);
    let { isChecked, quantity, price } = itemDelete

    if (isChecked) {
        cartTotalPrice -= quantity * price
        cartTotalCount -= quantity
    }

    cartTempDBArr = cartTempDBArr.filter((item) => item.productId != productId);
}

function deleteItemChecked() {
    let itemDeleteArr = cartTempDBArr.filter((item) => item.isChecked);

    for (let item of itemDeleteArr) {
        cartTotalPrice -= item.quantity * item.price
        cartTotalCount -= item.quantity
    }

    cartTempDBArr = cartTempDBArr.filter((item) => !item.isChecked);
}

function getItem(productId) {
    return cartTempDBArr.find(item => item.productId === productId);
}

function getItemAll() {
    return cartTempDBArr
}

function getItemIdAll() {
    return cartTempDBArr.map(item => item.productId)
}

function getItemChecked() {
    return cartTempDBArr.filter((item) => item.isChecked)
}

function getTotalPrice() {
    return cartTotalPrice
}

function getTotalCount() {
    return cartTotalCount
}

function isAllChecked() {
    return cartTempDBArr.reduce((acc, cur) => acc && cur.isChecked, true)
}

function updateItemQuantity(productId, newQuantity) {
    let currentItem = cartTempDBArr.find(item => item.productId === productId);
    let { isChecked, quantity, price } = currentItem

    if (isChecked) {
        cartTotalPrice += (newQuantity - quantity) * price
        cartTotalCount += newQuantity - quantity
    }

    currentItem.quantity = newQuantity
}

function updateItemChecked(productId, isCheckedNew) {
    let currentItem = cartTempDBArr.find(item => item.productId === productId);

    let { quantity, price, isChecked } = currentItem

    if (isCheckedNew == isChecked) {
        return;
    }

    if (isCheckedNew) {
        cartTotalPrice += quantity * price
        cartTotalCount += quantity
    } else {
        cartTotalPrice -= quantity * price
        cartTotalCount -= quantity
    }

    currentItem.isChecked = isCheckedNew
}


export {
    insertItem,
    deleteItem,
    deleteItemChecked,
    getItem,
    getItemAll,
    getItemChecked,
    getItemIdAll,
    isAllChecked,
    updateItemQuantity,
    updateItemChecked,
    getTotalPrice,
    getTotalCount
}