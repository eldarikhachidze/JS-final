const sliderCard = document.querySelector('#slider_card')

let slideIndex = 0;
// Event listeners for slider navigation
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
prevBtn.addEventListener('click', () => {
    slide(slideIndex - 1);
});

nextBtn.addEventListener('click', () => {
    slide(slideIndex + 1);
});

function populateSlider(movies) {
    const slider = document.getElementById('movie-slider');
    for (const movie of movies) {
        const card = sliderCard.content.cloneNode(true);
        card.querySelector('.slider__card_img').src = posterOriginalUrl + movie.poster_path;
        card.querySelector('.slider__card_title').textContent = movie.title;
        slider.appendChild(card);
    }
    slide(0);
}

function slide(newIndex) {
    const slides = document.querySelectorAll("#movie-slider .slider__card");
    if (newIndex >= slides.length) slideIndex = 0;
    else if (newIndex < 0) slideIndex = slides.length - 1;
    else slideIndex = newIndex;

    for (const slide of slides) {
        slide.style.display = 'none';
    }
    slides[slideIndex].style.display = 'flex'
}