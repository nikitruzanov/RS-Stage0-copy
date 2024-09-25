const apiKey = '1mamdOoL1-_Xoy8-qMTTqKUfFdI4Y5oARtO0H8tJR2fo';

async function getImages(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=18&client_id=${apiKey}&orientation=landscape`);
        const data = await response.json();
        console.log(data);
        returnImage(data.results);

    } catch (error) {
        console.error("Ошибка загрузки изображений:", error);
    }
}

async function getRandomImages() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?count=18&client_id=${apiKey}&orientation=landscape`);
        const data = await response.json();
        console.log(data);
        returnImage(data);

    } catch (error) {
        console.error("Ошибка загрузки изображений:", error);
    }
}

    function returnImage(data) {
        const array = document.querySelector('.arrayImage');
        array.innerHTML = '';
        data.forEach((image) => {
            const item = document.createElement('img');
            item.src = image.urls.small;
            item.alt = image.description;
            array.appendChild(item);
        })
    }

document.getElementById("search").addEventListener('click', () => {
    const query = document.getElementById("input").value;
    getImages(query);
})

document.getElementById("input").addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        getImages(query);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("input").focus();
    getRandomImages();
})


