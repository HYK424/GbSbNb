const productContainer = document.getElementById('productContainer');
const pageContainer = document.getElementById('pageContainer');
const resultNotification = document.getElementById('resultNotification');

async function renderProducts() {
  const query = location.href
    .split('?')[1]
    .split('&')
    .map((query) => query.split('='));
  const keyword = query.filter((q) => q[0] === 'keyword')[0][1];
  const data = await (await fetch(`/api/products/?keyword=${keyword}`)).json();
  const { products } = data;
  const { productsCount } = data;
  if (!productsCount) {
    resultNotification.innerText = `해당 상품명에 해당하는 검색 결과가 없어요 😅`;
  } else {
    resultNotification.innerText = `총 ${productsCount}건의 검색 결과가 존재합니다 😊`;
    products.forEach(renderProduct);
  }
}

function renderProduct(product) {
  const productCard = `<div class="card mb-4 shadow-lg ms-5" style="width: 27%"><a href="/products/${
    product._id
  }" class="card-link">
    <img src="${
      product.imageUrl
    }" class="card-img-top thumbnail mt-2 rounded shadow-sm"/>
    <div class="card-body p-2">
      <h5 class="card-title mt-0 mb-2">${product.title}</h5>
      <div class="overflow-hidden" id="product-description">${
        product.description
      }</div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item p-0 pb-2">${product.price.toLocaleString()}원</li>
    </ul>
    </a></div>`;
  productContainer.insertAdjacentHTML('beforeend', productCard);
}

renderProducts();
