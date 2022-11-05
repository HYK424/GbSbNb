const search = document.querySelector('.search');
const form = document.querySelector('.formDiv');
const cancel = document.querySelector('.cancel');
const items = document.querySelectorAll('.item');
const productContainer = document.querySelector('#productContainer');

async function renderProducts() {
  const res = await fetch(`/api/products`, {
    method: 'get',
  });
  const data = await res.json();
  const products = data.products;
  const { totalPage } = data;
  products.forEach(renderProduct);
}

function renderProduct(product) {
  const productCard = `<div class="card mb-4 shadow-lg" style="width: 27%"><a href="/products/${
    product._id
  }" class="card-link">
    <img src="${
      product.imageUrl
    }" class="card-img-top thumbnail mt-2 rounded shadow-sm"/>
    <div class="card-body p-2">
      <h5 class="card-title mt-0 mb-2">${product.title}</h5>
      <p class="card-text overflow-hidden">
        ${product.description}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item p-0 pb-2">${product.price.toLocaleString()}원</li>
    </ul>
    </a></div>`;
  productContainer.insertAdjacentHTML('beforeend', productCard);
}

renderProducts();
