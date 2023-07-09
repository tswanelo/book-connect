// Importing data from data.js module
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";


// Initialize variables
let matches = books;
let page = 1;



// Set the initial range for pagination
const range = [0, 10];

// Ensure 'books' data is available and is an array
if (!books || !Array.isArray(books)) {
  throw new Error('Source required');
}

// Ensure 'range' is a valid array with two numbers
if (!range || range.length < 2) {
  throw new Error('Range must be an array with two numbers');
}



// Define different themes with their color values
const Themes = {
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  },
};

// Select the theme dropdown and CSS styles
const Select = document.querySelector('[data-settings-theme]');
const css = document.getElementById('settings');

// Event listener for theme selection
css.addEventListener('submit', () => {
  event.preventDefault();
  const theme = Select.value;
  document.documentElement.style.setProperty('--color-dark', Themes[theme].dark);
  document.documentElement.style.setProperty('--color-light', Themes[theme].light);
});


// Get book list container and create a fragment to improve performance
const bookList = document.querySelector('[data-list-items]');
const fragment = document.createDocumentFragment();

// Extract the first 36 books for display
const extracted = books.slice(0, 36);

// Loop through extracted books and create HTML elements for each book preview
for (let i = 0; i < extracted.length; i++) {
  const bookPreviews = document.createElement('dl');
  bookPreviews.className = 'preview';
  bookPreviews.dataset.id = extracted[i].id;
  bookPreviews.dataset.title = extracted[i].title;
  bookPreviews.dataset.image = extracted[i].image;
  bookPreviews.dataset.subtitle = `${authors[extracted[i].author]} (${new Date(extracted[i].published).getFullYear()})`;
  bookPreviews.dataset.description = extracted[i].description;
  bookPreviews.dataset.genre = extracted[i].genres;

  bookPreviews.innerHTML = /*html*/ `
    <div>
      <img class='preview__image' src="${extracted[i].image}" alt="no picture available" />
    </div>
    <div class='preview__info'>
      <dt class='preview__title'>${extracted[i].title}</dt>
      <dt class='preview__author'> By ${authors[extracted[i].author]}</dt>
    </div>`;

  fragment.appendChild(bookPreviews);
}

// Append the book previews to the book list container
bookList.appendChild(fragment);



// Event listener for search button click to show the search overlay
document.querySelector('[data-header-search]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').showModal();
  document.querySelector('[data-search-title]').focus();
});

// Event listener for cancel button click to close the search overlay
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').close();
});



// Event listener for settings button click to show the settings overlay
document.querySelector('[data-header-settings]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').showModal();
  document.querySelector('[data-settings-theme]').focus();
});

// Event listener for cancel button click to close the settings overlay
document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').close();
});



// Function to handle book preview selection
const detailsToggle = (event) => {

  // Display book details if a book is selected
  if (event.target.dataset.id) {
    document.querySelector('[data-list-active]').style.display = "block";
  }

  // Update book details with selected book's information
  if (event.target.dataset.title) {
    document.querySelector('[data-list-title]').textContent = event.target.dataset.title;
  }

  if (event.target.dataset.subtitle) {
    document.querySelector('[data-list-subtitle]').textContent = event.target.dataset.subtitle;
  }

  if (event.target.dataset.description) {
    document.querySelector('[data-list-description]').textContent = event.target.dataset.description;
  }

  if (event.target.dataset.image) {
    document.querySelector('[data-list-image]').setAttribute('src', event.target.dataset.image);
    document.querySelector('[data-list-blur]').setAttribute('src', event.target.dataset.image);
  }
};

// Event listener for closing the book details view
document.querySelector('[data-list-close]').addEventListener('click', () => {
  document.querySelector('[data-list-active]').style.display = "";
});

// Event listener for selecting a book preview to show details
bookList.addEventListener('click', detailsToggle);



// Create dropdown options for genres

const genresFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.textContent = 'All Genres';
genresFragment.appendChild(element);

// Loop through genres and create option elements
for (const [id, name] of Object.entries(genres)) {
  element = document.createElement('option');
  element.value = id;
  element.textContent = name;
  genresFragment.appendChild(element);
}

// Append genres options to the search form
document.querySelector('[data-search-genres]').appendChild(genresFragment);

// Create dropdown options for authors

const authorsFragment = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.textContent = 'All Authors';
authorsFragment.appendChild(element);

// Loop through authors and create option elements
for (const [id, name] of Object.entries(authors)) {
  element = document.createElement('option');
  element.value = id;
  element.textContent = name;
  authorsFragment.appendChild(element);
}

// Append authors options to the search form
document.querySelector('[data-search-authors]').appendChild(authorsFragment);

// Update show more button and its disabled state based on the number of remaining books
document.querySelector('[data-list-button]').innerHTML = `
  <span>Show more</span>
  <span class="list__remaining">(${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})</span>
`;
document.querySelector('[data-list-button]').disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);





