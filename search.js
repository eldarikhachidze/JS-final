const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchOverlay = document.querySelector('.search__overlay')

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    if (query) {
        const movies = await searchMovies(query);
        displaySearchResults(movies);
    }
});

searchInput.addEventListener('focus', () => {
    searchOverlay.style.display = 'flex'
})
searchInput.addEventListener('blur', () => {
    searchOverlay.style.display = 'none'
})
async function searchMovies(query) {
    const response = await fetch(`${ApiUrl}/search/movie?query=${query}`, {
        headers: {
            'Authorization': 'bearer ' + apiKay
        }
    });
    const data = await response.json();
    return data.results;
}

function displaySearchResults(movies) {
    // Clear previous search results
    const container = document.querySelector('.search__overlay');
    container.innerHTML = "";

    // Render the movies
    for (const movie of movies) {
        const card = movieCard.content.cloneNode(true);
        card.querySelector('img').src = posterOriginalUrl + movie.poster_path;
        card.querySelector('.name').textContent = movie.title;
        card.querySelector('.rating').textContent = 'imdb: ' + movie.vote_average;
        card.querySelector('.overview').textContent = movie.overview;
        card.querySelector('.watchTrailer').addEventListener('click', async (e) => {
            videoOverlay.classList.add('show');
            disableScroll();
            const data = await getVideoTrailer(movie.id);

            if (data && data.length > 0) { // Check if data is defined and has at least one item
                videoOverlay.querySelector('iframe').src = youtubeTrailerUrl + data[0].key;
            } else {
                console.error("No video trailer found for movie with ID:", movie.id);
            }
        });
        container.appendChild(card);
    }
}