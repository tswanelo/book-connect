// Import the 'authors' object from the 'data.js' module
import { authors } from './data.js';

// Create a document fragment to hold the author options
const authorsHtml = document.createDocumentFragment();

// Create the first 'All Authors' option element
const firstAuthorElement = document.createElement('option');
firstAuthorElement.value = 'any';
firstAuthorElement.textContent = 'All Authors'; // Set the text content for the option
authorsHtml.appendChild(firstAuthorElement);

// Loop through the 'authors' object and create option elements for each author
for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    element.value = id; // Set the value attribute to the author's ID
    element.textContent = name; // Set the text content for the option using the author's name
    authorsHtml.appendChild(element);
}

// Find the element with the attribute 'data-search-authors'
const searchAuthorsElement = document.querySelector('[data-search-authors]');

// Append the author options to the 'searchAuthorsElement'
searchAuthorsElement.appendChild(authorsHtml);

