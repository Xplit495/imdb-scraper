# IMDb Scraper

## About

IMDb Scraper is a web application built with Node.js that leverages the Express framework and 
scraping tools like Axios and Cheerio to extract and display movie data based on user-specified 
genres from IMDb. It provides a clean interface to filter and retrieve movies details dynamically.

## Features

- Dynamic web scraping of IMDb movie data based on genre filters.
- Interactive user interface to display movie details like ranking, title, release date, rating, director, actors, and a brief synopsis.
- Efficient handling of asynchronous HTTP requests to gather movie data.

## Technologies

- Node.js: Backend runtime environment.
- Express: Web application framework for routing and server setup.
- Axios: Promise-based HTTP client for making requests.
- Cheerio: jQuery-like tool for parsing HTML and manipulating data.
- he: Library to decode HTML entities.

## Project Structure

- public: Contains static files like HTML, CSS, and client-side JavaScript.
- templates: Stores HTML templates (index.html, result.html) served by Express.
- Root directory contains server code (server.js) that sets up the Express application and routes.

## Installation

1. Ensure you have Node.js installed on your machine.
2. Clone the repository: git clone https://github.com/Xplit495/imdb-scraper.git.
3. Install the required packages: npm install.
4. Start the server: node .\server.js

## Usage

- The application runs on http://localhost:8080 (normally your browser open itself).
- The home page allows users to select a genre to fetch movie data.
- The /scrape route handles the scraping and returns the data in JSON format based on the selected genre.

## API Routes

- GET /: Serves the main page where users can select genres.
- GET /result.html: Serves a results page that can display scraped data.
- POST /scrape: Accepts a genre filter and scrapes IMDb for movies matching the filter, returning structured JSON data.

## Author

- [Xplit495](https://github.com/Xplit495)