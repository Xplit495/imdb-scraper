document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM content to be fully loaded before executing the code

    const movieListContainer = document.getElementById('movieList'); // Get reference to the container for movie list

    const moviesData = JSON.parse(localStorage.getItem('moviesData')); // Retrieve movie data from local storage and parse it as JSON

    if (movieListContainer && moviesData && Array.isArray(moviesData)) {
        // Check if the movie list container exists and if movie data exists and is an array

        moviesData.forEach((movie) => {
            // Iterate through each movie data

            // Create container for each movie
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-container');

            // Create container for movie image
            const cardImage = document.createElement('div');
            cardImage.classList.add('card-image');
            const image = document.createElement('img');
            image.src = movie.image; // Set image source
            image.alt = `Picture of ${movie.title}`; // Set image alt text
            cardImage.appendChild(image); // Append image to card image container

            // Create container for movie details
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Create elements for movie details and set their content
            const movieTitle = document.createElement('h2');
            movieTitle.textContent = movie.title; // Set movie title
            cardContent.appendChild(movieTitle); // Append title to card content

            const ranking = document.createElement('p');
            ranking.textContent = `IMDb ranking : ${movie.ranking}`; // Set IMDb ranking
            cardContent.appendChild(ranking); // Append ranking to card content

            const movieYear = document.createElement('p');
            movieYear.textContent = `Year of release : ${movie.date}`; // Set year of release
            cardContent.appendChild(movieYear); // Append year of release to card content

            const movieRating = document.createElement('p');
            movieRating.textContent = `IMDb rating : ${movie.rating || 'N/A'}`; // Set IMDb rating, display 'N/A' if rating is not available
            cardContent.appendChild(movieRating); // Append IMDb rating to card content

            const movieDirector = document.createElement('p');
            movieDirector.textContent = `Director(s) : ${movie.director}`; // Set director(s)
            cardContent.appendChild(movieDirector); // Append director(s) to card content

            const movieActors = document.createElement('p');
            movieActors.textContent = `Actor(s) : ${movie.actors.join(', ')}`; // Set actor(s)
            cardContent.appendChild(movieActors); // Append actor(s) to card content

            const movieSynopsis = document.createElement('p');
            movieSynopsis.textContent = `Synopsis : ${movie.synopsis}`; // Set movie synopsis
            cardContent.appendChild(movieSynopsis); // Append synopsis to card content

            // Append movie image and details to the movie container
            cardContainer.appendChild(cardImage);
            cardContainer.appendChild(cardContent);

            // Append movie container to the movie list container
            movieListContainer.appendChild(cardContainer);
        });
    } else {
        console.error('No movies data found.'); // Log an error if movie data is missing or not in the expected format
    }

    localStorage.removeItem('moviesData'); // Remove movie data from local storage after displaying it
});