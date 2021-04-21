// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)


const API_KEY = '63727bfa5b324cce98dfb8d2c9fd3f38'
const urlBase = 'https://api.weatherbit.io/v2.0/current?'
const lat = 41.3868;
const lon = 2.1803;

// lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely


https://api.weatherbit.io/v2.0/current?lat=41.3868&lon=2.1803&key=63727bfa5b324cce98dfb8d2c9fd3f38

var URL = urlBase + '&lat=' + lat + '&lon=' + lon + '&key=' + API_KEY;

console.log(URL);

// const app = document.querySelector("#app");
// let divR = document.createElement("div");
// divR.className = "row";
// app.appendChild(divR);

const postInfo = (responseJson) => {

    let img = document.querySelector("div.weather-icon img");
    let forecast = responseJson.data[0];
    console.log(forecast);

    let iconUrl = 'https://www.weatherbit.io/static/img/icons/' + forecast.weather.icon + '.png';
    console.log(iconUrl);
    img.src = iconUrl;

    let ptemperature = document.querySelector('div.temperature-value p');
    ptemperature.textContent = forecast.temp;

    let pDescription = document.querySelector('div.temperature-description p');
    pDescription.textContent = forecast.weather.description;

    let pLocation = document.querySelector('div.location p');
    pLocation.textContent = '[' + forecast.city_name + ']';
    // divLocation.appendChild(pLocation);

}



function handleErrors(response) {
    if (!response.ok) {
        throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
    }
    return response;
}

const getForecast = () => {
    fetch(URL)
        .then(handleErrors)
        .then(response => response.json())
        .then(postInfo)
        .catch((error) => { console.log(error) })
}

getForecast();