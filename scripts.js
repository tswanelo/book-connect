
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

let matches = books;
let page = 1;
const range = [0, 10];

if (!books || !Array.isArray(books)) {
  throw new Error('Source required');
}

if (!range || range.length < 2) {
  throw new Error('Range must be an array with two numbers');
}

// Theme part

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

const Select = document.querySelector('[data-settings-theme]');
const css = document.getElementById('settings');

css.addEventListener('submit', (event) => {
  event.preventDefault();
  const theme = Select.value;
  document.documentElement.style.setProperty('--color-dark', Themes[theme].dark);
  document.documentElement.style.setProperty('--color-light', Themes[theme].light);
});

const DarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = DarkMode ? 'night' : 'day';
document.documentElement.style.setProperty('--color-dark', Themes[initial].dark);
document.documentElement.style.setProperty('--color-light', Themes[initial].light);

// End of Theme part



// Preview Images, Title

const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

function createPreview(bookData) {
  const { author, image, title } = bookData;

  const preview = document.createElement('div');
  preview.classList.add('preview');

  const previewImage = document.createElement('img');
  previewImage.src = image;
  previewImage.alt = title;
  preview.appendChild(previewImage);

  const previewTitle = document.createElement('h2');
  previewTitle.textContent = title;
  preview.appendChild(previewTitle);

  const previewAuthor = document.createElement('p');
  previewAuthor.textContent = authors[author];
  preview.appendChild(previewAuthor);

  return preview;
}

function createPreviewFragment(data, start, end) {
  const fragment = document.createDocumentFragment();

  for (let i = start; i < end && i < data.length; i++) {
    const { author, image, title, id } = data[i];

    const preview = createPreview({
      author,
      id,
      image,
      title
    });

    fragment.appendChild(preview);
  }

  return fragment;
}

for (let i = 0; i < extracted.length; i++) {
  const { author, image, title, id } = extracted[i];

  const preview = createPreview({
    author,
    id,
    image,
    title
  });

  fragment.appendChild(preview);
}

document.querySelector('[data-list-items]').appendChild(fragment);

// End preview part




const genresFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.textContent = 'All Genres';
genresFragment.appendChild(element);

for (const [id, name] of Object.entries(genres)) {
  element = document.createElement('option');
  element.value = id;
  element.textContent = name;
  genresFragment.appendChild(element);
}

document.querySelector('[data-search-genres]').appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.textContent = 'All Authors';
authorsFragment.appendChild(element);

for (const [id, name] of Object.entries(authors)) {
  element = document.createElement('option');
  element.value = id;
  element.textContent = name;
  authorsFragment.appendChild(element);
}


// show more button

document.querySelector('[data-search-authors]').appendChild(authorsFragment);
document.querySelector('[data-list-button]').textContent = `Show more (${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})`;
document.querySelector('[data-list-button]').disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);
document.querySelector('[data-list-button]').innerHTML = `
  <span>Show more</span>
  <span class="list__remaining">(${Math.max(0, matches.length - page * BOOKS_PER_PAGE)})</span>
`;

document.querySelector('[data-list-button]').addEventListener('click', () => {
  const start = page * BOOKS_PER_PAGE;
  const end = (page + 1) * BOOKS_PER_PAGE;
  const fragment = createPreviewFragment(matches, start, end);
  document.querySelector('[data-list-items]').appendChild(fragment);
  document.querySelector('[data-list-button]').textContent = `Show more (${Math.max(0, matches.length - (page + 1) * BOOKS_PER_PAGE)})`;
  document.querySelector('[data-list-button]').disabled = !(matches.length - (page + 1) * BOOKS_PER_PAGE > 0);
  page++;
});


// Search button

document.querySelector('[data-header-search]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').showModal();
  document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').close();
});


// Settings button

document.querySelector('[data-header-settings]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').showModal();
  document.querySelector('[data-settings-theme]').focus();
});
document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').close();
});



document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || book.author === filters.author;
    let genreMatch = false;

    if (filters.genre === 'any') {
      genreMatch = true;
    } else {
      for (const genre of book.genres) {
        if (genre === filters.genre) {
          genreMatch = true;
          break;
        }
      }
    }

    // Takes through books

    if (titleMatch && authorMatch && genreMatch) {
      result.push(book);
    }
  }



  if (result.length < 1) {
    document.querySelector('[data-list-message]').classList.add('list__message');
  } else {
    document.querySelector('[data-list-message]').classList.remove('list__message');
  }


  //Search books also

  document.querySelector('[data-list-items]').innerHTML = '';

  //list the book when search
  const fragment = createPreviewFragment(result, range[0], range[1]);
  document.querySelector('[data-list-items]').appendChild(fragment);

});






