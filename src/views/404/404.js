const title = document.querySelector('#title');
const image = document.querySelector('#image');
const price = document.querySelector('#price');
const category = document.querySelector('#category');
const manufacturer = document.querySelector('#manufacturer');
const description = document.querySelector('#description');

const fetchProductInfo = async () => {
  const productId = window.location.pathname.split('/')[2];
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      //오류 처리 ex) flashError(data);
    } else {
      title.innerText = data.title;
      image.src = data.imageUrl;
      price.innerText = `${data.price.toLocaleString()}원`;
      category.innerText = data.categoryId;
      manufacturer.innerText = data.manufacturer;
      description.innerText = data.description;
    }
  } catch (err) {
    console.log(err);
  }
};

fetchProductInfo();
