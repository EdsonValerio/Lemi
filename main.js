/* main.js - Lógica Global */
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('lemi-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      htmlEl.setAttribute('data-theme', savedTheme);
    } else if (systemDark) {
      htmlEl.setAttribute('data-theme', 'dark');
    }

    if(themeBtn){
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('lemi-theme', newTheme);
        });
    }
});