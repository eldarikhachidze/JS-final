const apiKay = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDA2OTJlY2U3NGY2ZmY1OTRhNGJjMzgwOGU0OTBiNyIsInN1YiI6IjY1MzEzZTk3MTEwOGE4MDEwYmU4YjM3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7COKE6eBYWN3bxBRhWh73d3K5_h9X8tzWJs7fTBlo0U'

const ApiUrl = 'https://api.themoviedb.org/3';
const posterOriginalUrl = 'https://image.tmdb.org/t/p/original';
const youtubeTrailerUrl = 'https://youtube.com/embed/';


const movieCard = document.querySelector('#movie_card')
const videoOverlay = document.querySelector('.video__overlay')


videoOverlay.addEventListener('click', () => {
    const iframe = videoOverlay.querySelector('iframe');
    const currentSrc = iframe.src;
    iframe.src = '';
    iframe.src = currentSrc;
    videoOverlay.classList.remove('show')
    enableScroll()
});



function disableScroll() {
    document.body.classList.add('no-scroll');
};

function enableScroll() {
    document.body.classList.remove('no-scroll');
};



async function getUpcomingMovies() {
    const response = await fetch(ApiUrl + '/movie/upcoming', {
        headers: {
            'Authorization': 'bearer ' + apiKay
        }
    });
    const movies = await response.json();

    renderMovies(movies.results, '#upcoming');
    populateSlider(movies.results.slice(-3)); // Last three movies
}

async function getTopRatingMovies() {
    const response = await fetch(ApiUrl + '/movie/top_rated', {
        headers: {
            'Authorization': 'bearer ' + apiKay
        }
    });
    const movies = await response.json();

    renderMovies(movies.results, '#topRated')
}

async function getPopularMovies() {
    const response = await fetch(ApiUrl + '/movie/popular', {
        headers: {
            'Authorization': 'bearer ' + apiKay
        }
    });
    const movies = await response.json();

    renderMovies(movies.results, '#popular')
}

async function getNowPlayingMovies() {
    const response = await fetch(ApiUrl + '/movie/now_playing', {
        headers: {
            'Authorization': 'bearer ' + apiKay
        }
    });
    const movies = await response.json();

    renderMovies(movies.results, '#nowPlaying')
}

async function getVideoTrailer(id) {
    const response = await fetch(`${ApiUrl}/movie/${id}/videos`, { // <-- use backticks here
        headers: {
            'Authorization': 'bearer ' + apiKay
        }
    });
    const data = await response.json();

    return data.results;
}



function renderMovies(movies, selector) {
    const container = document.querySelector(selector)


    for (let i = 0; i < movies.length; i++) {
        const card = movieCard.content.cloneNode(true);
        const movie = movies[i];
        card.querySelector('img').src = posterOriginalUrl + movie.poster_path
        card.querySelector('.name').textContent = movie.title
        card.querySelector('.rating').textContent = 'imdb: ' + movie.vote_average
        card.querySelector('.overview').textContent = movie.overview
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

        container.appendChild(card)
    }
    while (container.children.length > 5) {
        container.removeChild(container.firstChild);
    }
}

getUpcomingMovies()
getTopRatingMovies()
getPopularMovies()
getNowPlayingMovies()

//  {
//       "adult": false,
//       "backdrop_path": "/oP03EF9eYWqvycFGN5TeEo3nN7l.jpg",
//       "genre_ids": [
//         27,
//         9648
//       ],
//       "id": 1024773,
//       "original_language": "en",
//       "original_title": "It Lives Inside",
//       "overview": "Desperate to fit in at school, Sam rejects her East Indian culture and family to be like everyone else. However, when a mythological demonic spirit latches onto her former best friend, she must come to terms with her heritage to defeat it.",
//       "popularity": 349.102,
//       "poster_path": "/73gIfV8gDwkVgUrFDzt4TfZC9Zc.jpg",
//       "release_date": "2023-09-06",
//       "title": "It Lives Inside",
//       "video": false,
//       "vote_average": 5.2,
//       "vote_count": 31
//     },