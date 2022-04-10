import './sass/main.scss';
import axios, { Axios } from 'axios';
import Notiflix from 'notiflix';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


//DOM import
const $form = document.querySelector("form");
const galleryBox = document.querySelector("div.gallery");

//My API key
const apiKey = '15302977-99a8e51ff55a3c0e02bc236e3';
let pages = 1;
//nadpisanie zachowania domyslnego form
const submitForm = (ev) => {
  const $form = ev.currentTarget;
  ev.preventDefault();
  
  cleanGalery();
  // pages = 1;

  const { elements: { searchQuery }
  } = $form;

  getFoto(searchQuery.value);
  // $form.reset();
};

function cleanGalery() {
while (galleryBox.firstChild) {
    galleryBox.removeChild(galleryBox.firstChild);
  };
  pages = 1;
};

function galleryItemsAdd(galleryItems) {
  console.log("tworzenie galeri");
  galleryItems.forEach((el) => {
    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");
    galleryLink.href = el.largeImageURL;

    const galleryImage = document.createElement("img");
    galleryImage.classList.add("gallery__image");
    galleryImage.src = el.previewURL;
    galleryImage.alt = el.tags;

    // const galleryLike = document.createElement("div");
    // galleryLike.classList.add("gallery__like")
    // const element = el;
    // const galleryArray = `
    //   <p class="info-item">
    //     <b>Likes</b>${element.likes}
    //   </p>
    //   <p class="info-item">
    //     <b>Views</b>${element.views}
    //   </p>
    //   <p class="info-item">
    //     <b>Comments</b>${element.comments}
    //   </p>
    //   <p class="info-item">
    //     <b>Downloads</b>${element.downloads}
    //   </p>`;
    // galleryLike.innerHTML = galleryArray;

    galleryBox.append(galleryLink);
    galleryLink.append(galleryImage);
    // galleryLink.append(galleryLike);
  });
};


//Fetch image from http
async function getFoto(word) {
  try {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pages}`;
    console.log(url);
    const response = await axios.get(url);
    
    const fotoArray = response.data.hits;
    console.log(fotoArray);
    if (fotoArray.length < 1)
    {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return 0;
    }
    Notiflix.Notify.success("Hurra, We find it.");
    galleryItemsAdd(fotoArray);
    return fotoArray;
  } catch (error) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    console.log(error);
  }
};

$form.addEventListener("submit", submitForm);

galleryBox.addEventListener("click", (ev) => {
  ev.preventDefault();
  console.log(ev.target.alt);
});
galleryBox.onclick = (ev) => {
  const lightbox = new SimpleLightbox(".gallery a", {
    spinner: false,
    captionsData: "alt",
    captionPosition: "outside",
    captionDelay: 250,
  });
};

window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      console.log($form.searchQuery.value);
      pages += 1;
      getFoto($form.searchQuery.value);
    };
  }
)