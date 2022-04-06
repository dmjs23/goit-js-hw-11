import './sass/main.scss';
import axios, { Axios } from 'axios';

//DOM import
const input = document.querySelector("input")
const btn = document.querySelector('button')

async function getFoto(words) {
    const apiKey = '15302977-99a8e51ff55a3c0e02bc236e3';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${words}&image_type=photo`
    const searchWord = toString(words)
    console.log(searchWord);
    try {
      const response = await axios.get(url);
      const data = response.data;
      const hits = response.data.hits;
      console.log(hits);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

btn.addEventListener('submit', ()=> {
    const result = input.value
    getFoto(result)
});

