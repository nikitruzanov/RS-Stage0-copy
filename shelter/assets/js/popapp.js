let petsData = [];

fetch('data/pets.json')
    .then(res => res.json())
    .then(data => {
        petsData = data;
        console.log(petsData);
    })



document.querySelectorAll('.pets-item').forEach(item => {
item.addEventListener('click', function () {

    const index = this.getAttribute('data-index');

    const pet = petsData[index];
    document.querySelector('#popup-img').src = pet.img;
    document.querySelector('#popup-name').textContent = pet.name;
    document.querySelector('#popup-breed').textContent = `${pet.type} - ${pet.breed}`;
    document.querySelector('#popup-description').textContent = pet.description;
    document.querySelector('#popup-age').textContent = pet.age;
    document.querySelector('#popup-inoculations').textContent = pet.inoculations;
    document.querySelector('#popup-diseases').textContent = pet.diseases;
    document.querySelector('#popup-parasites').textContent = pet.parasites;

    document.querySelector('#popup-overlay').classList.toggle('active');
    document.body.classList.toggle('block');
});
});

document.querySelector('.close-btn, #popup-overlay').addEventListener('click', function () {
        document.querySelector('#popup-overlay').classList.remove('active');
        document.body.classList.remove('block');
    });

