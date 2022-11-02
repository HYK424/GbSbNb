// fetch('http://localhost:3000/api/products')
// .then((res)=>res.json())
// .then(data=>console.log(data));
const title=document.querySelector('.title').value
const category=document.querySelector('.category').value
const manufacture=document.querySelector('.manufacture').value
const price=document.querySelector('.price').value
const description=document.querySelector('.description').value
const thumbnail=document.querySelector('.thumbnail');

const thumbnailFile=thumbnail.addEventListener('change',(e)=>{
    const image=e.target.files[0];
    const imageFile=URL.createObjectURL(image);
    return imageFile;
});

document.querySelector('.btn').addEventListener('click',async()=>{
 
    const post=await fetch('http://localhost:3000/api/products',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
             title: title,
            category: category,
            manufacture: manufacture,
            price: price,
            description:description,
            thumbnail: imageFile
             })
      
    } )
    
})



