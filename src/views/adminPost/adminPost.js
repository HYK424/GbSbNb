const title=document.querySelector('.title').value
const category=document.querySelector('.category').value
const manufacture=document.querySelector('.manufacture').value
const price=document.querySelector('.price').value
const description=document.querySelector('.description').value


const form=document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
})

// const form = document.querySelector(".postForm");
// const titleInput = form.querySelector(".title");
// const subcategoryInput = form.querySelector(".subcategory");
// const contentInput = form.querySelector(".summernote");
// const tagsInput = form.querySelector(".tags");
// const thumbnailInput = form.querySelector(".thumbnail");
// let file;

// form.addEventListener("submit", handleFormSubmit);
// thumbnailInput.addEventListener("change", handleFiles, false);

// function handleFiles() {
//   file = this.files[0];
// }

// async function handleFormSubmit(event) {
//   event.preventDefault();
//   const title = titleInput.value;
//   const subcategory = subcategoryInput.value;
//   const content = contentInput.value;
//   const tags = tagsInput.value;
//   const thumbnail = file;
//   const formData = {
//     title,
//     subcategory,
//     content,
//     tags,
//     thumbnail,
//   };
//   try {
//     const res = await fetch("http://localhost:3000/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),

// });
//   } catch (error) {
//     console.log(error);
//   }
// }
