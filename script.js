document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('theme-toggle');
    
    function setTheme(theme) {
        document.body.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        // Change particle color based on theme
        if (window.particles) {
            particles.material.color.setHex(theme === 'dark' ? 0x888888 : 0x333333);
        }
    }
    
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Set initial theme based on user's preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
});