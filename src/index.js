import './sass/main.scss';
import axios, { Axios } from 'axios';
import Notiflix from 'notiflix';

//DOM import
const input = document.querySelector("input")
const btn = document.querySelector('button')

//Base URL
const apiKey = '26531596-66f70a56847dae6fbc6ddebb0';
const url = `https://pixabay.com/api/?key=${apiKey}&q=car&image_type=photo`;
//Fetch image from http
async function getFoto() {
  try {
    const response = await axios.get(url);
    const fotoArray = response.data.hits;
    return fotoArray;
  } catch (error) {
    console.log(error);
  }
};
const x = getFoto();
//Create gallery funcion
function createGallery(array) {
  const gallery = array.map({
    const test =`<div class="photo-card">
      <img class="gallery__image" src="${array.webformatURL} "alt="${array.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${array.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${array.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${array.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${array.downloads}
        </p>
      </div>
    </div>`
    return test
    console.log(gallery);
  });
createGallery(x);
//         `<div class="photo-card">
//           <img class="gallery__image" src="${backendObj.webformatURL}" alt="${backendObj.tags}" loading="lazy" />
//           <div class="info">
//             <p class="info-item">
//               <b>Likes</b>${backendObj.likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b>${backendObj.views}
//             </p>
//             <p class="info-item">
//               <b>Comments</b>${backendObj.comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b>${backendObj.downloads}
//             </p>
//           </div>
//         </div>`,
//     )
//     .join('');
//   console.log(markup);
// }
// createGalleryTags(x)