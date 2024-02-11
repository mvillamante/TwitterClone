let navlist = document.querySelectorAll('.navlist');

function activeLink() {
    for (let j = 0; j < navlist.length; j++) {
        navlist[j].classList.remove('active');
    }
    this.classList.add('active');
}


navlist.forEach((item) =>
    item.addEventListener('click', activeLink));


let navUser = document.querySelector('.nav-user');
let userPopup = document.querySelector('.user-popup');
let showTriangle = document.querySelector('.triangle');

navUser.onclick = function(){
    userPopup.classList.toggle('active')
    showTriangle.classList.toggle('active')
}


let viewpost = document.querySelector('.btn-container.viewpost');

viewpost.addEventListener('click', function() {
    viewpost.classList.toggle('active');
    if (viewpost.classList.contains('active')) {
        viewpost.style.pointerEvents = 'none';
    } else {
        viewpost.style.pointerEvents = 'auto'; 
    }
});

// script when icon down/up is clicked
const moreIcon = document.querySelectorAll('.fa-solid.fa-caret-down');
moreIcon.forEach(icon => {
    icon.addEventListener('click', function() {
        // changes the icon
        if (this.classList.contains('fa-caret-down')) {
            this.classList.remove('fa-caret-down');
            this.classList.add('fa-caret-up');
        } else {
            this.classList.remove('fa-caret-up');
            this.classList.add('fa-caret-down');
        }
        
        // shows and/or hides elements
        const moreElement = this.parentElement.nextElementSibling;
        moreElement.classList.toggle('show');
    });
});


const buttons = document.querySelectorAll('.btn-container.viewpost .btn');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.active === 'false') {
      button.dataset.active = 'true';
      button.classList.add('active');
    } else {
      button.dataset.active = 'false';
      button.classList.remove('active');
    }
  });
});
