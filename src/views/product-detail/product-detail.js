const title = document.getElementById('title');
const image = document.getElementById('image');
const price = document.getElementById('price');
const category = document.getElementById('category');
const manufacturer = document.getElementById('manufacturer');
const description = document.getElementById('description');

const fetchProductInfo = async () => {
  const productId = window.location.pathname.split('/')[2];
  try {
    const productInfo = await (
      await fetch(`/api/products/${productId}`)
    ).json();
    renderProductInfo(productInfo);
  } catch (err) {
    // 에러 처리 방법 구현할 것
  }
};

const renderProductInfo = (productInfo) => {
  title.innerText = productInfo.title;
  image.src = productInfo.imageUrl;
  price.innerText = `${productInfo.price.toLocaleString('ko-KR')}원`;
  category.innerText = productInfo.category;
  manufacturer.innerText = productInfo.manufacturer;
  description.innerText = productInfo.description;
};

fetchProductInfo();
