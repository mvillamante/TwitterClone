// selectors
const themeToggleBtn = document.querySelector('#theme-toggle');
const homeLogoImg = document.querySelector('#home-logo-img');
const introLogoImg = document.querySelector('#intro-logo-img');

// state
const theme = localStorage.getItem('theme');

// on mount
if (theme && theme !== '') {
    document.body.id = theme;
}

//handlers
handleThemeToggle = () => {
    if (document.body.id === 'dark-mode'){
        document.body.id = '';
        localStorage.removeItem('theme');
    } else {
        document.body.id = 'dark-mode';
        localStorage.setItem('theme', 'dark-mode');
    }
    changeLogoImage(homeLogoImg, document.body.id);
    changeLogoImage(introLogoImg, document.body.id);
};

const changeLogoImage = (logoImg, theme) => {
    if (theme === 'dark-mode') {
      logoImg.src = './img/logo_light.png'; 
    } else {
      logoImg.src = './img/logo_dark.png'; 
    }
  };

// events
themeToggleBtn.addEventListener('click', handleThemeToggle);

//change img logo
const checkTheme = () => {
    if (document.body.id === 'dark-mode') {
      changeLogoImage(homeLogoImg, 'dark-mode');
      changeLogoImage(introLogoImg, 'dark-mode');   
    } else {
      changeLogoImage(homeLogoImg, '');
      changeLogoImage(introLogoImg, '');
    }
  };
  
  checkTheme();