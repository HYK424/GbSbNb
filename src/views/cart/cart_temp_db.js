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
    deleteItem = cartTempDBArr.find(item => item.productId === productId);

    if (isChecked) {
        cartTotalPrice -= quantity * price
        cartTotalCount -= quantity
    }

    cartTempDBArr = cartTempDBArr.filter((item) => item.productId != productId);
}

function getItem(productId) {
    return cartTempDBArr.find(item => item.productId === productId);
}

function getItemAll() {
    return cartTempDBArr
}

function getTotalPrice() {
    return cartTotalPrice
}

function getTotalCount() {
    return cartTotalCount
}

function updateItemQuantity(productId, quantity) {
    let currentItem = cartTempDBArr.find(item => item.productId === productId);
    let oldQuantity = currentItem.quantity

    if (isChecked) {
        cartTotalPrice += (quantity - oldQuantity) * price
        cartTotalCount += quantity - oldQuantity
    }

    currentItem.quantity = quantity
}

function updateItemChecked(productId, isChecked) {
    let currentItem = cartTempDBArr.find(item => item.productId === productId);
    let oldChecked = currentItem.isChecked;

    if (isChecked == oldChecked) {
        return;
    }

    if (isChecked) {
        cartTotalPrice += quantity * price
        cartTotalCount += quantity
    } else {
        cartTotalPrice -= quantity * price
        cartTotalCount -= quantity
    }

    currentItem.isChecked = isChecked
}

export { insertItem, deleteItem, getItem, getItemAll, updateItemQuantity, updateItemChecked, getTotalPrice, getTotalCount }