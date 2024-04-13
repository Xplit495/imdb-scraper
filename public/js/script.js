document.addEventListener('DOMContentLoaded', function() {
    // When the DOM content is loaded, execute the following code

    const form = document.getElementById('scrapeForm'); // Get reference to the form element
    const loadingScreen = document.getElementById('loadingScreen'); // Get reference to the loading screen element

    form.addEventListener('submit', function(e) {
        // Add event listener for form submission
        e.preventDefault(); // Prevent default form submission behavior
        const selectedFilter = document.getElementById('filterSelect').value; // Get the selected filter value from the dropdown

        showLoadingScreen(); // Show loading screen while waiting for response

        // Send a POST request to the server with the selected filter
        fetch('http://localhost:8080/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON content type
            },
            body: JSON.stringify({ filter: selectedFilter }), // Convert filter value to JSON format and send in the request body
        })
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                if (data && Array.isArray(data.movies)) { // Check if the response contains the expected movie data
                    localStorage.setItem('moviesData', JSON.stringify(data.movies)); // Store movie data in local storage
                    window.location.href = 'result.html'; // Redirect to the result page
                } else {
                    console.error('Error: Data are not in the expected format.'); // Log an error if data format is unexpected
                    hideLoadingScreen(); // Hide loading screen
                }
            })
            .catch(error => {
                console.error('Error:', error); // Log any errors that occur during the fetch request
                hideLoadingScreen(); // Hide loading screen
            });
    });

    function showLoadingScreen() {
        // Function to show loading screen
        loadingScreen.style.display = 'block'; // Display loading screen
    }

    function hideLoadingScreen() {
        // Function to hide loading screen
        loadingScreen.style.display = 'none'; // Hide loading screen
    }
});
