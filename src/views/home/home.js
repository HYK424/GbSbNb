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
  const productCard = `<div class="card mb-4" style="width: 27%"><a href="" class="card-link">
    <img src="${product.imageUrl}" class="card-img-top thumbnail mt-2"/>
    <div class="card-body p-2">
      <h5 class="card-title my-0">${product.title}</h5>
      <p class="card-text">
        ${product.description.slice(0, 20)}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${product.price}</li>
      <li class="list-group-item">A third item</li>
    </ul>
    </a></div>`;
  productContainer.insertAdjacentHTML('beforeend', productCard);
}

renderProducts();
