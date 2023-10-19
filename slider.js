// // Event listeners for slider navigation
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
//
// let slideIndex = 0;
//
//
// prevBtn.addEventListener('click', () => {
//     slide(slideIndex - 1);
// });
//
// nextBtn.addEventListener('click', () => {
//     slide(slideIndex + 1);
// });
// async function getUpcomingMovies() {
//     const response = await fetch(ApiUrl + '/movie/upcoming', {
//         headers: {
//             'Authorization': 'bearer ' + apiKay
//         }
//     });
//     const movies = await response.json();
//
//     renderMovies(movies.results, '#upcoming');
//     populateSlider(movies.results.slice(-3)); // Last three movies
// }
//
// function populateSlider(movies) {
//     const slider = document.getElementById('movie-slider');
//     for (const movie of movies) {
//         const card = movieCard.content.cloneNode(true);
//         card.querySelector('.slider__card_img').src = posterOriginalUrl + movie.poster_path;
//         card.querySelector('.slider__card_title').textContent = movie.title;
//         slider.appendChild(card);
//     }
// }
//
//
// function slide(newIndex) {
//     const slides = document.querySelectorAll("#movie-slider .movie__card");
//     if (newIndex >= slides.length) slideIndex = 0;
//     else if (newIndex < 0) slideIndex = slides.length - 1;
//     else slideIndex = newIndex;
//
//     for (const slide of slides) {
//         slide.style.display = 'none';
//     }
//     slides[slideIndex].style.display = 'block';
// }
//
// getUpcomingMovies()
//
// console.log(getUpcomingMovies())
//
//
