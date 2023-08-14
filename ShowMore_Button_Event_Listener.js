// Importing necessary variables and data from './data.js'
import { books, authors, BOOKS_PER_PAGE, page, matches } from './data.js';

// Setting the label and disabled state for the "Show more" button
document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;

// Updating the "Show more" button's content with remaining matches count
document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`;

// Adding a click event listener to the "Show more" button
document.querySelector('[data-list-button]').addEventListener('click', () => {
    // Creating a fragment to hold the new elements
    const fragment = document.createDocumentFragment();

    // Looping through a slice of the matches array and creating buttons for each match
    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        // Creating a button element for each match
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        // Populating the button's content with image, title, and author information
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

        // Appending the button element to the fragment
        fragment.appendChild(element);
    }

    // Appending the fragment to the list of items and updating the page count
    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
});
