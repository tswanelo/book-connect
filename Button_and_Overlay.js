import { books, BOOKS_PER_PAGE, page, matches } from './data.js';

// Updating button text and disabling it
const listButton = document.querySelector('[data-list-button]');
listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;

// Disable the button if there are no more books to show
listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 0;

// Configuring button HTML content
const remainingCount = Math.max(matches.length - (page * BOOKS_PER_PAGE), 0);
listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingCount})</span>
`;

// Function to handle overlay cancel event
const closeOverlay = (overlaySelector) => {
    document.querySelector(overlaySelector).open = false;
};

// Search overlay cancel event listener
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    closeOverlay('[data-search-overlay]');
});

// Settings overlay cancel event listener
document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    closeOverlay('[data-settings-overlay]');
});

// Header button event listeners
document.querySelector('[data-header-search]').addEventListener('click', () => {
    // Open the search overlay and set focus to the search title input
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    // Open the settings overlay
    document.querySelector('[data-settings-overlay]').open = true;
});

// List close button event listener
document.querySelector('[data-list-close]').addEventListener('click', () => {
    // Close the active list overlay
    closeOverlay('[data-list-active]');
});

