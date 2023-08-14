// Importing 'books' and 'authors' arrays from the data.js file
import { books, authors } from './data.js';

// Adding a click event listener to an element with a '[data-list-items]' attribute
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    // Converting the event path to an array (handling different browsers)
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null; // Initializing a variable to store the active book

    // Looping through the path elements to find the clicked element with dataset 'preview'
    for (const node of pathArray) {
        if (active) break; // If active book is found, exit the loop

        if (node?.dataset?.preview) {
            let result = null;

            // Looping through the 'books' array to find a book with a matching ID
            for (const singleBook of books) {
                if (result) break; // If result is found, exit the loop
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            }

            active = result; // Assigning the found book to the 'active' variable
        }
    }

    if (active) {
        // Updating the UI with details of the active book
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        
        // Displaying the author's name and publication year
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        
        // Displaying the book's description
        document.querySelector('[data-list-description]').innerText = active.description;
    }
});

