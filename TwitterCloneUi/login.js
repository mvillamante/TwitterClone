//loading page
document.addEventListener('DOMContentLoaded', function () {
    var vesperaText = document.querySelector('.loading-page');
    var loginContainer = document.querySelector('.box');

    vesperaText.addEventListener('transitionend', function () {
        vesperaText.style.display = 'none'; 
        loginContainer.style.display = 'block'; 
    });

    setTimeout(function () {
        vesperaText.classList.add('exit-animation'); 
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



document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.querySelector('.sign-up-form');
    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        register(event);
    });
});

//register function 
function register() {
    const username= document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    const registerData =  {
        "username": username,
        "password": password
    };
    registerApi(registerData);
}


//register API function
async function registerApi(data) {
    event.preventDefault();
    try {
        const res = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
         if (res.ok) {
            loginApi(data);
         } else {
            alert('Incorrect username or password');
            const errorData = await res.json();
            console.error(errorData);
         }
        }catch(error) {
            console.error('Error: ', error);
    }
}


//login function
function login() {
    
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;


    const loginData = {
        "username": username, 
        "password": password
    };
    loginApi(loginData);
}
//login API function
async function loginApi(data) {
    try {
        const res = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (res.ok) {
            const token = await res.text();
            localStorage.setItem('token', token);
            console.log(token); 
            window.location.href = 'home.html';
        } else {
            alert('Incorrect username or password');
            const errorData = await res.text();
            console.error(errorData);
        }
    } catch(error) {
        console.error('Error: ', error);
    }
}

//password validation
function validatePassword() {
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password != confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity("Passwords do not match");
    } else {
        document.getElementById('confirmPassword').setCustomValidity('');
    }
}

document.getElementById('confirmPassword').addEventListener('input', validatePassword);


//log-in password
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    if (type === 'password') {
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
    } else {
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
    }
});

//sign-up password
const signUpInput = document.getElementById('signUpPassword');
const toggleSignUpPassword = document.getElementById('toggleUpPassword'); 

toggleSignUpPassword.addEventListener('click', function() {
    const type = signUpInput.getAttribute('type') === 'password' ? 'text' : 'password';
    signUpInput.setAttribute('type', type);

    if (type === 'password') {
        toggleSignUpPassword.classList.remove('fa-eye');
        toggleSignUpPassword.classList.add('fa-eye-slash');
    } else {
        toggleSignUpPassword.classList.remove('fa-eye-slash');
        toggleSignUpPassword.classList.add('fa-eye');
    }
});

//confirm password
const confirmPassword = document.getElementById('confirmPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword'); 

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);

    if (type === 'password') {
        toggleConfirmPassword.classList.remove('fa-eye');
        toggleConfirmPassword.classList.add('fa-eye-slash');
    } else {
        toggleConfirmPassword.classList.remove('fa-eye-slash');
        toggleConfirmPassword.classList.add('fa-eye');
    }
});

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

<<<<<<< HEAD
start();


// play on load for gallery view
setTimeout(transition, 1000);

$('.js-trigger-transition').on('click', function(e) {
  e.preventDefault();
  transition();
});

function transition() {
  var tl = new TimelineMax();
  
  tl.to(CSSRulePlugin.getRule('body:before'), 0.2, {cssRule: {top: '50%' }, ease: Power2.easeOut}, 'close')
  .to(CSSRulePlugin.getRule('body:after'), 0.2, {cssRule: {bottom: '50%' }, ease: Power2.easeOut}, 'close')
  .to($('.loader'), 0.2, {opacity: 1})
  .to(CSSRulePlugin.getRule('body:before'), 0.2, {cssRule: {top: '0%' }, ease: Power2.easeOut}, '+=1.5', 'open')
  .to(CSSRulePlugin.getRule('body:after'), 0.2, {cssRule: {bottom: '0%' }, ease: Power2.easeOut}, '-=0.2', 'open')
  .to($('.loader'), 0.2, {opacity: 0}, '-=0.2');
}
=======
async function helloWorld() {
    const res = await fetch("http://localhost:3000/api")
    const text = await res.text()
    console.log(text);
}

start();
>>>>>>> 2fe8f124157ec75efa44c83de74858a2ca0a11c1
