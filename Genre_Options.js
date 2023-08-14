// Importing the 'genres' object from the './data.js' module
import { genres } from './data.js';

// Creating a document fragment to store the generated HTML elements
const genreHtml = document.createDocumentFragment();

// Creating the first option element for "All Genres"
const firstGenreElement = document.createElement('option');
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

// Looping through each genre in the 'genres' object and creating option elements
for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
}

// Appending the generated genre options to the element with the attribute 'data-search-genres'
document.querySelector('[data-search-genres]').appendChild(genreHtml);


