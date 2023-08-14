// Import necessary data and variables from 'data.js'
import { books, authors, BOOKS_PER_PAGE, page, matches } from './data.js';

// Add an event listener to the search form's submit event
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Get form data
    const filters = Object.fromEntries(formData); // Convert form data to an object
    const result = []; // Array to store filtered books

    // Loop through each book to apply filters
    for (const book of books) {
        let genreMatch = filters.genre === 'any'; // Flag to check genre match

        // Check if any of the book's genres match the selected genre filter
        for (const singleGenre of book.genres) {
            if (genreMatch) break; // If genre match already found, exit loop
            if (singleGenre === filters.genre) {
                genreMatch = true; // Set genre match flag if found
            }
        }

        // Check if book matches all applied filters
        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book); // Add book to the filtered result list
        }
    }

    // Update page and matches variables
    page = 1;
    matches = result;

    // Show or hide a message if no books match the filters
    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    // Clear existing list items
    document.querySelector('[data-list-items]').innerHTML = '';
    const newItems = document.createDocumentFragment(); // Create a document fragment to hold new items

    // Loop through the first few filtered results to display
    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button'); // Create a button element
        element.classList = 'preview'; // Add CSS class
        element.setAttribute('data-preview', id); // Set data attribute for preview

        // Set button's inner HTML
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

        newItems.appendChild(element); // Add the button element to the document fragment
    }

    // Add the new items to the list
    document.querySelector('[data-list-items]').appendChild(newItems);

    // Enable or disable the "Show more" button based on remaining matches
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    // Update "Show more" button text with remaining matches count
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close the search overlay
    document.querySelector('[data-search-overlay]').open = false;
});
