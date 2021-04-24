// const API_KEY = '63727bfa5b324cce98dfb8d2c9fd3f38'
const WEATHER_API_KEY = 'af4640f0ab044f5daf55fa0a59ec55b0';
const WEATHER_BASE_URL = 'https://api.weatherbit.io/v2.0/current?';
const MAP_API_KEY = `pk.eyJ1IjoiYXJ0aHVybm5uIiwiYSI6ImNrbnZ2YXQ1YTA2OWMyb252cTgwZWl6cncifQ.XgVq_N09PL3CyiI4K30lMg`;


var citiesWeatherArray = [];
const cities = [
    { name: "Barcelona", latitude: 41.390205, longitude: 2.154007 },
    { name: "Moscow", latitude: 55.75583, longitude: 37.61778, },
    { name: "New York", latitude: 40.72833, longitude: -73.99417 },
    { name: "Beijing", latitude: 39.905, longitude: 116.39139 },
    { name: "Istanbul", latitude: 41.01, longitude: 28.96028 },
    { name: "Lagos", latitude: 6.45, longitude: 3.4 },
    { name: "San Pablo", latitude: -23.5, longitude: -46.61667 },
    { name: "Sydney", latitude: -33.86944, longitude: 151.20833 }];

const parseAndRender = (responseJson) => {

    let weatherObj = responseJson.data[0];
    console.log('Success: ');
    console.log(weatherObj);

    let city = `${weatherObj.city_name}, ${weatherObj.country_code}`;
    let notification = "";
    let temperature = `${weatherObj.temp}°C`;
    let iconUrl = `https://www.weatherbit.io/static/img/icons/${weatherObj.weather.icon}.png`;
    let description = weatherObj.weather.description;

    var cityWeather = [city, notification, iconUrl, temperature, description];
    console.log(cityWeather);
    citiesWeatherArray.push(cityWeather);

    renderCard(cityWeather[0], cityWeather[1], cityWeather[2], cityWeather[3], cityWeather[4]);
}

const renderCard = (city, notification, iconUrl, temperature, description) => {

    const card = document.createElement("div");
    card.className = "container";
    document.querySelector("#cards").appendChild(card);

    const divCity = document.createElement("div");
    divCity.className = "city";
    card.appendChild(divCity);
    const pCity = document.createElement("p");
    divCity.appendChild(pCity);
    pCity.innerHTML = city;
    // console.log(`Render ${city} from array`);

    if (notification != "") {
        const divNotification = document.createElement("div");
        divNotification.className = "notification";
        divNotification.style.display = "block";
        card.appendChild(divNotification);
        const pNotification = document.createElement("p");
        divNotification.appendChild(pNotification);
        pNotification.innerHTML = notification;
    }

    const divWeather = document.createElement("div");
    divWeather.className = "weather-container";
    card.appendChild(divWeather);

    const divIcon = document.createElement("div");
    divIcon.className = "weather-icon";
    divWeather.appendChild(divIcon);
    const imgIcon = document.createElement("img");
    divIcon.appendChild(imgIcon);
    imgIcon.src = iconUrl;

    const divTemp = document.createElement("div");
    divTemp.className = "temperature-value";
    divWeather.appendChild(divTemp);
    const pTemp = document.createElement("p");
    divTemp.appendChild(pTemp);
    pTemp.innerHTML = temperature;

    const divDescription = document.createElement("div");
    divDescription.className = "temperature-description";
    divWeather.appendChild(divDescription);
    const pDescription = document.createElement("p");
    divDescription.appendChild(pDescription);
    pDescription.innerHTML = description;
}

function handleErrors(response) {
    if (!response.ok) {
        renderCard("-", "Hay un problema", "icons/unknown.png", `- ºC`, "-");
        throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
    }
    return response;
}

const getWeather = (latitude, longitude) => {
    const URL = `${WEATHER_BASE_URL}&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`;
    fetch(URL)
        .then(handleErrors)
        .then(response => response.json())
        .then(parseAndRender)
        .catch((error) => { console.log(error) })
}

const filterCards = () => {

    var divCards = document.querySelector("#cards");
    var searchString = document.querySelector("input");
    setInterval(() => {
        input.addEventListener("keyup", event => {
            const searchString = event.target.value.toLowerCase();
            // clear list of cards
            while (divCards.firstChild) {
                divCards.removeChild(divCards.firstChild);
            }
            citiesWeatherArray.filter(item => item[0].toLowerCase().includes(searchString))
                .forEach((item) => renderCard(item[0], item[1], item[2], item[3], item[4]));
        });
    }, 2000);
}

cities.forEach((item) => getWeather(item.latitude, item.longitude))
filterCards();
