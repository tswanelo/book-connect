// Import necessary data and constants from 'data.js'
import { authors, BOOKS_PER_PAGE, matches } from './data.js';

// Create a document fragment to hold the elements before adding them to the DOM
const starting = document.createDocumentFragment();

// Loop through the first 'BOOKS_PER_PAGE' items in the 'matches' array
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    // Create a button element for each book preview
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    // Populate the button's inner HTML with book preview content
    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    // Append the button element to the document fragment
    starting.appendChild(element);
}

// Append the populated document fragment to the DOM under the specified selector
document.querySelector('[data-list-items]').appendChild(starting);
