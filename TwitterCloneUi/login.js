document.addEventListener('DOMContentLoaded', function () {
    var vesperaText = document.querySelector('.loading-page');
    var loginContainer = document.querySelector('.box');

    vesperaText.addEventListener('transitionend', function () {
        vesperaText.style.display = 'none'; // Hide the loading page
        loginContainer.style.display = 'block'; // Display the login container
    });

    setTimeout(function () {
        vesperaText.classList.add('exit-animation'); // Trigger exit animation after 2000 milliseconds
    }, 2000);
});

//login page
const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

toggle_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});


async function helloWorld() {
    const res = await fetch("http://localhost:3000/api")
    const text = await res.text()
    console.log(text);
}

document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.querySelector('.sign-up-form');
    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        register(event);
    });
});



function register(event) {
    event.preventDefault();
    
    const formData =  {
    username: document.getElementById('signUpUsername').value,
    password: document.getElementById('signUpPassword').value
    }

    fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error:', response.status);
        }
        return response.text();
        })
        .then(data => {
            console.log(data);
            alert('User registered successfully');
            window.location.href = 'home.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Username already exist');
        });
    }

async function login() {

    const formData =  {
        username: document.querySelector('.sign-in-form input[type="text"]').value,
        password: document.querySelector('.sign-in-form input[type="password"]').value,
    };

    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (!res.ok) {
        alert('Incorrect username or password');
        return;
    }
    const token = await res.text()
    console.log(token);

    window.location.href = 'home.html';
}

async function start() {
    await helloWorld()
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.sign-in-form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        await login();
    });
});

start();