let petsData = [];
let currentPage = 1;
let totalPages = 0;

function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 769) return 8;
    if (width > 320 && width <= 768) return 6;
    return 3;
}

function initializePetsData() {
    return fetch('data/pets.json')
        .then(res => res.json())
        .then(data => {
            petsData = Array(6).fill(data).flat();
            petsData = petsData.sort(() => Math.random() - 0.5);
            totalPages = Math.ceil(petsData.length / getCardsPerPage());
        });
}

function generatePageContent() {
    const container = document.getElementById('pets-container');
    container.innerHTML = '';

    const cardsPerPage = getCardsPerPage();
    const start = (currentPage - 1) * getCardsPerPage();
    const end = start + getCardsPerPage();
    const pageItems = petsData.slice(start, end);
    const uniqueItems = [];

    while (uniqueItems.length < cardsPerPage && petsData.length > 0) {
        const randomIndex = Math.floor(Math.random() * petsData.length);
        const pet = petsData[randomIndex];
        if (!uniqueItems.includes(pet)) {
            uniqueItems.push(pet);
        }
    }

    uniqueItems.forEach(pet => {
        const card = `
            <div class="pets-item cursor" data-name="${pet.name}">
                <img src="${pet.img}" alt="${pet.name}">
                <p class="name-pet">${pet.name}</p>
                <button class="learn-more cursor">Learn more</button>
            </div>`;
        container.innerHTML += card;
    });

    updatePagination();
}

function updatePagination() {
    const pageCount = document.querySelector('.page-number');
    pageCount.textContent = currentPage;

    const leftArrow = document.querySelector('.arrow-left');
    const doubleLeftArrow = document.querySelector('.arrow-double-left');
    const rightArrow = document.querySelector('.arrow-right');
    const doubleRightArrow = document.querySelector('.arrow-double-right');

    if (currentPage === 1) {
        leftArrow.classList.add('disables', 'off');
        doubleLeftArrow.classList.add('disables', 'off');
    } else {
        leftArrow.classList.remove('disables', 'off');
        doubleLeftArrow.classList.remove('disables', 'off');
    }

    if (currentPage === totalPages) {
        rightArrow.classList.add('disables', 'off');
        doubleRightArrow.classList.add('disables', 'off');
    } else {
        rightArrow.classList.remove('disables', 'off');
        doubleRightArrow.classList.remove('disables', 'off');
    }
}

function setupPaginationButtons() {
    document.querySelector('.arrow-right').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            generatePageContent();
        }
    });

    document.querySelector('.arrow-left').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            generatePageContent();
        }
    });

    document.querySelector('.arrow-double-right').addEventListener('click', () => {
        currentPage = totalPages;
        generatePageContent();
    });

    document.querySelector('.arrow-double-left').addEventListener('click', () => {
        currentPage = 1;
        generatePageContent();
    });
}

function initializePagination() {
    initializePetsData().then(() => {
        generatePageContent();
        setupPaginationButtons();
        activatePopup(petsData);
    });
}

initializePagination();

