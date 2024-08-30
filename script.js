document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Start Trading button functionality
    const startTradingBtn = document.getElementById('start-trading-btn');
    if (startTradingBtn) {
        startTradingBtn.addEventListener('click', function() {
            alert('Welcome to Polaris! You can start trading after completing the registration process.');
            // Here you would typically redirect to a registration or trading page
            // window.location.href = 'trading.html';
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // Function to set a given theme/color-scheme
    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.setAttribute('data-theme', themeName);
    }

    // Function to toggle between light and dark theme
    function toggleTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    // Immediately invoked function to set the theme on initial load
    (function () {
        if (localStorage.getItem('theme') === 'dark') {
            setTheme('dark');
            document.getElementById('checkbox').checked = true;
        } else {
            setTheme('light');
        }
    })();

    // Event listener for the theme toggle
    document.getElementById('checkbox').addEventListener('change', function() {
        toggleTheme();
    });
});