const form = document.querySelector('#form');
const titleInput = form.querySelector('.title');
const categoryInput = form.querySelector('.category');
const manufactureInput = form.querySelector('.manufacturer');
const priceInput = form.querySelector('.price');
const descriptionInput = form.querySelector('.description');
const thumbnailInput = form.querySelector('#formFile');
let file;

form.addEventListener('submit', handleFormSubmit);
thumbnailInput.addEventListener('change', handleFiles, false);

function handleFiles() {
  file = this.files[0];
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const title = titleInput.value;
  const categoryId = categoryInput.value;
  const manufacturer = manufactureInput.value;
  const price = priceInput.value;
  const description = descriptionInput.value;
  const image = file;

  const data = new FormData();
  data.enctype = 'multipart/form-data';
  data.append('title', title);
  data.append('categoryId', categoryId);
  data.append('manufacturer', manufacturer);
  data.append('price', price);
  data.append('description', description);
  data.append('image', image);
  console.log(data);
  try {
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
}
