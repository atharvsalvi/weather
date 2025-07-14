
const API = "1a016acee81dd5d6d86ccbb801a2a71d"

function displayWeather() {
    const inputCity = document.querySelector('.input-city');
    const city = inputCity.value;
    getResults(city);
    inputCity.value = "";
}

async function getResults(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);
        const data = await response.json();
        console.log(data);
        updateResults(data);
    }
    catch(error) {
        const card = document.querySelector('.card');
        card.style.display = 'none';

        const errorMessage = document.querySelector('.error');
        errorMessage.style.display = 'block';

        console.log(error);
    }
}

function updateResults(data) {
    const {name:city , main: {temp, humidity}, weather: [{description, id}], timezone} = data;

    const inputCity = document.querySelector('.city');
    const displayTemp = document.querySelector('.temperature');
    const displayHumidity = document.querySelector('.humidity');
    const displayClouds = document.querySelector('.clouds');
    const card = document.querySelector('.card');
    const errorMessage = document.querySelector('.error');
    
    displayClouds.textContent = cloudEmoji(id);
    inputCity.textContent = city;
    displayTemp.textContent = `${(temp - 273.3).toFixed(2)}°C`;
    displayHumidity.textContent = humidity;

    card.style.display = 'block';
    errorMessage.style.display = 'none';

    updateTime(timezone);
}

function cloudEmoji(cloudID) {
    switch(true) {
        case (cloudID >= 200 && cloudID<300) : return "⛈️"; 
        case (cloudID >= 300 && cloudID<400) : return "☔"; 
        case (cloudID >= 500 && cloudID<600) : return "🌧️";
        case (cloudID >= 600 && cloudID<700) : return "❄️";
        case (cloudID >= 700 && cloudID<800) : return "🌫️";
        case (cloudID == 800) : return "☀️";
        case (cloudID > 800 && cloudID<900) : return "🌤️";
    }
}

function updateTime(timezone) {
    const UTCtime = Date.now();
    const now = new Date(UTCtime + timezone*1000);
    const timeElement = document.querySelector('.time');
    timeElement.innerHTML = `${now.getUTCHours()}:${now.getUTCMinutes()}`;
}