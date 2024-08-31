let petsData = [];
let currentSlideIndex = 0;
let previousSlideItems = [];

function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 769) return 3;
    if (width > 320 && width <= 768) return 2;
    return 1;
}

function getRandomItems(arr, count) {
    const shuffled = arr.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function generateSliderCards() {
    const container = document.getElementById('pets-container');
    container.innerHTML = '';

    const cardsPerPage = getCardsPerPage();
    const availableItems = petsData.filter(pet => !previousSlideItems.includes(pet));
    const slideItems = getRandomItems(availableItems.length >= cardsPerPage ? availableItems : petsData, cardsPerPage);

    slideItems.forEach((pet, index) => {
        const card = `
            <div class="pets-item cursor" data-name="${pet.name}">
                <img src="${pet.img}" alt="${pet.name}">
                <p class="name-pet">${pet.name}</p>
                <button class="learn-more cursor">Learn more</button>
            </div>`;
        container.innerHTML += card;
    });

    previousSlideItems = slideItems;
    activatePopup(slideItems);
}

document.querySelector('.arrow-right').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + getCardsPerPage()) % petsData.length;
    generateSliderCards();
});

document.querySelector('.arrow-left').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - getCardsPerPage() + petsData.length) % petsData.length;
    generateSliderCards();
});

fetch('data/pets.json')
    .then(res => res.json())
    .then(data => {
        petsData = data.sort(() => Math.random() - 0.5);
        generateSliderCards();
    });
