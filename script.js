document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const cityElement = document.getElementById('city');
    const countryElement = document.getElementById('country');
    const tempElement = document.getElementById('temp');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const pressureElement = document.getElementById('pressure');
    const weatherIconElement = document.getElementById('weather-icon');
    const refreshButton = document.getElementById('refresh-btn');

    // Add loading class to elements
    function setLoading(isLoading) {
        const elements = [cityElement, tempElement, descriptionElement];
        if (isLoading) {
            elements.forEach(el => el.classList.add('loading'));
        } else {
            elements.forEach(el => el.classList.remove('loading'));
        }
    }

    // Set weather icon based on weather condition
    function setWeatherIcon(weatherCode) {
        weatherIconElement.className = ''; // Clear existing classes
        
        if (weatherCode >= 200 && weatherCode < 300) {
            // Thunderstorm
            weatherIconElement.className = 'fas fa-bolt stormy';
        } else if (weatherCode >= 300 && weatherCode < 400) {
            // Drizzle
            weatherIconElement.className = 'fas fa-cloud-rain rainy';
        } else if (weatherCode >= 500 && weatherCode < 600) {
            // Rain
            weatherIconElement.className = 'fas fa-cloud-showers-heavy rainy';
        } else if (weatherCode >= 600 && weatherCode < 700) {
            // Snow
            weatherIconElement.className = 'fas fa-snowflake snowy';
        } else if (weatherCode >= 700 && weatherCode < 800) {
            // Atmosphere (fog, mist, etc.)
            weatherIconElement.className = 'fas fa-smog cloudy';
        } else if (weatherCode === 800) {
            // Clear
            weatherIconElement.className = 'fas fa-sun sunny';
        } else if (weatherCode > 800) {
            // Clouds
            weatherIconElement.className = 'fas fa-cloud cloudy';
        } else {
            // Default
            weatherIconElement.className = 'fas fa-cloud';
        }
    }

    // Fetch weather data from our Cloudflare Worker
    async function fetchWeatherData() {
        setLoading(true);
        
        try {
            const response = await fetch('/api/weather');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Update UI with weather data
            cityElement.textContent = data.name;
            countryElement.textContent = data.sys.country;
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `${data.main.humidity}%`;
            windElement.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
            pressureElement.textContent = `${data.main.pressure} hPa`;
            
            // Set weather icon
            setWeatherIcon(data.weather[0].id);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            cityElement.textContent = 'Error';
            descriptionElement.textContent = 'Could not fetch weather data. Please try again.';
        } finally {
            setLoading(false);
        }
    }

    // Initial fetch
    fetchWeatherData();

    // Refresh button event listener
    refreshButton.addEventListener('click', fetchWeatherData);
});
