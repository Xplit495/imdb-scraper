const express = require('express'); // Importing the Express framework
const axios = require('axios'); // Importing Axios for making HTTP requests
const cheerio = require('cheerio'); // Importing Cheerio for parsing HTML
const he = require('he'); // Importing he for decoding HTML entities
const app = express(); // Creating an Express application
const port = 8080; // Setting the server port

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the index.html file from the 'templates' directory on the root route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public/templates' });
});

app.get('/result.html', (req, res) => {
    res.sendFile('result.html', { root: 'public/templates' });
});


// Route for scraping IMDb data
app.post('/scrape', async (req, res) => {
    const { filter } = req.body; // Extracting the filter value from the request body
    const url = `https://m.imdb.com/chart/top/?genres=${filter}`; // Constructing the IMDb URL with the selected filter

    try {
        // Sending a GET request to the IMDb URL
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3', // User-Agent header to mimic a web browser
            }
        });

        // Using Cheerio to parse the HTML response
        const $ = cheerio.load(data);

        // Extracting movie links from the HTML
        const links = [];
        $('ul.ipc-metadata-list.ipc-metadata-list--dividers-between.sc-a1e81754-0.eBRbsI.compact-list-view.ipc-metadata-list--base li').each((index, element) => {
            const href = $(element).find('a').attr('href');
            const fullLink = `https://m.imdb.com${href}`;
            links.push(fullLink);
        });

        // Array to store movie data
        const movieDataArray = [];

        // Array of promises for making requests to each movie link
        const requests = links.map((link, index) => {
            return axios.get(link, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' // User-Agent header
                }
            }).then(response => {
                // Parsing JSON-LD data from the movie page
                const $ = cheerio.load(response.data);
                const ldJsonText = $('script[type="application/ld+json"]').first().html();
                const movieData = JSON.parse(ldJsonText);

                // Filtering and structuring the movie data
                const filteredData = {
                    ranking: index + 1,
                    image: movieData.image,
                    title: he.decode(movieData.name),
                    date: movieData.datePublished.substring(0, 4),
                    rating: movieData.aggregateRating ? movieData.aggregateRating.ratingValue : null,
                    director: movieData.director ? movieData.director.map(d => d.name).join(', ') : '',
                    actors: movieData.actor ? movieData.actor.map(actor => he.decode(actor.name)) : [],
                    synopsis: he.decode(movieData.description)
                };

                movieDataArray.push(filteredData); // Pushing filtered movie data to the array
            }).catch(error => {
                console.error(`Error retrieving URL ${link}:`, error); // Handling errors
            });
        });

        await Promise.all(requests); // Waiting for all requests to complete

        movieDataArray.sort((a, b) => a.ranking - b.ranking); // Sorting movie data by ranking

        res.json({ movies: movieDataArray }); // Sending the scraped movie data as a JSON response

    } catch (error) {
        console.error('Error during Scraping :', error); // Handling errors
        res.status(500).send('Internal server error'); // Sending a 500 status code in case of error
    }
});

// Starting the server
app.listen(port, () => {
    import('open').then(open => {
        open.default(`http://localhost:${port}`).then(() => console.log()); // Opening the server URL in the default browser
    });
});