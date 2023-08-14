// Check if the user's preferred color scheme is dark
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Set the value of the theme selector to 'night'
    document.querySelector('[data-settings-theme]').value = 'night';

    // Update the dark and light color variables for dark mode
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    // Set the value of the theme selector to 'day'
    document.querySelector('[data-settings-theme]').value = 'day';

    // Update the dark and light color variables for light mode
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

// Listen for form submission event on settings form
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    // Update theme colors based on user's selection
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    // Close the settings overlay after updating
    document.querySelector('[data-settings-overlay]').open = false;
});
