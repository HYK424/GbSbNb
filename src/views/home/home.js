const productContainer = document.getElementById('productContainer');
const pageContainer = document.getElementById('pageContainer');

async function renderProducts() {
  let data;
  if (location.href.split('?')[1]) {
    const query = location.href
      .split('?')[1]
      .split('&')
      .map((query) => query.split('='));
    let page = query.filter((q) => q[0] === 'page')[0];
    if (page) page = page[1];
    const category = query.filter((q) => q[0] === 'q')[0][1];
    console.log(page, category);
    if (category || page) {
      if (category && page) {
        data = await (
          await fetch(`/api/products?q=${category}&page=${page}`)
        ).json();
      } else if (category) {
        data = await (await fetch(`/api/products?q=${category}`)).json();
      } else if (page) {
        data = await (await fetch(`/api/products?page=${page}`)).json();
      }
    }
  } else {
    data = await (await fetch(`/api/products`)).json();
  }
  const { products } = data;
  const { totalPage } = data;
  products.forEach(renderProduct);
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
