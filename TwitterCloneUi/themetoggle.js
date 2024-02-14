// selectors
const themeToggleBtn = document.querySelector('#theme-toggle');

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
};

// events
themeToggleBtn.addEventListener('click', handleThemeToggle);