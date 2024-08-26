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
    document.getElementById('start-trading-btn').addEventListener('click', function() {
        alert('Welcome to YourAppName! You can start trading after completing the registration process.');
        // Here you would typically redirect to a registration or trading page
        // window.location.href = 'https://yourapp.com/register';
    });

    // Market filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically filter the market table based on the selected option
        });
    });

    // Fetch cryptocurrency data from CoinGecko API
    async function fetchCryptoData() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            updateMarketTable(data);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            document.getElementById('market-data').innerHTML = '<tr><td colspan="5">Failed to load market data. Please try again later.</td></tr>';
        }
    }

    function updateMarketTable(data) {
        const tableBody = document.getElementById('market-data');
        tableBody.innerHTML = ''; // Clear existing data

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5">No market data available.</td></tr>';
            return;
        }

        data.forEach(coin => {
            const row = document.createElement('tr');
            const priceChangeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
            
            row.innerHTML = `
                <td>
                    <img src="${coin.image}" alt="${coin.name}" class="coin-image">
                    ${coin.name} (${coin.symbol.toUpperCase()})
                </td>
                <td>$${coin.current_price.toFixed(2)}</td>
                <td class="${priceChangeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
                <td>$${coin.total_volume.toLocaleString()}</td>
                <td><button class="trade-btn">Trade</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Reattach event listeners to new trade buttons
        document.querySelectorAll('.trade-btn').forEach(button => {
            button.addEventListener('click', function() {
                const coinName = this.closest('tr').querySelector('td').textContent.trim();
                alert(`Opening trading interface for ${coinName}`);
            });
        });
    }

    // Fetch data immediately and then every 60 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 60000);

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });

    // Add smooth reveal animations
    const revealElements = document.querySelectorAll('section');
    const revealElementsOnScroll = function() {
        for (var i = 0; i < revealElements.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = revealElements[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add("active");
            } else {
                revealElements[i].classList.remove("active");
            }
        }
    }
    window.addEventListener("scroll", revealElementsOnScroll);
    revealElementsOnScroll();
});