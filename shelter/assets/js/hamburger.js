document.querySelector('.hamburger').addEventListener('click', function () {
    document.querySelector('.hamburger').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
    document.body.classList.toggle('block');
    document.querySelector('.nav-list').classList.toggle('active');
});

document.querySelectorAll('.nav-link, .overlay').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
        document.body.classList.remove('block');
        document.querySelector('.nav-list').classList.remove('active');
    });
});