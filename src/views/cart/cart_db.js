function getItemAll() {
    return JSON.parse(localStorage.getItem('cart'));
}

function getItemQuantity(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let updatedCartItems = [...cartItems];
    let itemIndex = cartItems.findIndex((item) => item.productId === productId);
    return updatedCartItems[itemIndex].quantity
}

function deleteItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let updatedCartItems = [...cartItems];
    updatedCartItems = updatedCartItems.filter((item) => item.productId != productId);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
}

function updateItem(productId, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    let updatedCartItems = [...cartItems];
    let itemIndex = cartItems.findIndex((item) => item.productId === productId);
    updatedCartItems[itemIndex].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
}

export { getItemAll, getItemQuantity, deleteItem, updateItem };