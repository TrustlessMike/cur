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

const background = document.querySelector('.background');

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    star.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random fall duration
    background.appendChild(star);

    // Remove the star after the animation ends
    star.addEventListener('animationend', () => {
        star.remove();
    });
}

// Create stars at intervals
setInterval(createStar, 300); // Adjust the interval for more or fewer stars