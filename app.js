const API_KEY = '63727bfa5b324cce98dfb8d2c9fd3f38'
const urlBase = 'https://api.weatherbit.io/v2.0/current?'

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

    renderCard(city, notification, iconUrl, temperature, description);
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
    const URL = `${urlBase}&lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
    fetch(URL)
        .then(handleErrors)
        .then(response => response.json())
        .then(parseAndRender)
        .catch((error) => { console.log(error) })
}

cities.forEach((item) => getWeather(item.latitude, item.longitude));