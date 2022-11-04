function getItemAll() {
    return JSON.parse(localStorage.getItem('cart'));
}

function deleteItem(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const updatedCartItems = [...cartItems];
    updatedCartItems = updatedCartItems.filter((item) => item.productId != productId);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
}

function updateItem(productId, quantity) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const updatedCartItems = [...cartItems];
    const itemIndex = cartItems.findIndex((item) => item.productId === productId);
    updatedCartItems[itemIndex].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
}

export { getItemAll, deleteItem, updateItem };