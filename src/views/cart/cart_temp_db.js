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
        console.log(cartTotalPrice)
        cartTotalCount += quantity
        console.log(cartTotalCount)
    }

    cartTempDBArr.push(item)
}

function deleteItem(productId) {
    deleteItem = cartTempDBArr.find(item => item.productId === productId);
    let { isChecked, quantity, price } = deleteItem

    if (isChecked) {
        cartTotalPrice -= quantity * price
        cartTotalCount -= quantity
    }

    cartTempDBArr = cartTempDBArr.filter((item) => item.productId != productId);
}

function deleteItemChecked() {
    deleteItem = cartTempDBArr.filter((item) => item.isChecked);

    for (let item of deleteItem) {
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