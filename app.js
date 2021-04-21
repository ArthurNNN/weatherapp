// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)

const API_KEY = '63727bfa5b324cce98dfb8d2c9fd3f38'
const urlBase = 'https://api.weatherbit.io/v2.0/current?'

// var latitude = 41.3868;
// var longitude = 2.1803;

const cities = [];
cities.push({
    name: "Barcelona",
    latitude: 41.390205,
    longitude: 2.154007,
});
cities.push({
    name: "Madrid",
    latitude: 40.41,
    longitude: -3.70,
});
cities.push({
    name: "Valencia",
    latitude: 39.47,
    longitude: -0.38
});



// const getUserPosition = () => {
//     navigator.geolocation.getCurrentPosition((location) => {
//         console.log(location);
//         const { coords: { latitude, longitude } } = location;
//         getForecast(latitude, longitude);
//     }, (error) => console.error(error), { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
// }

const render = (responseJson) => {

    let weather = responseJson.data[0];
    console.log('Success: ');
    console.log(weather);

    //     <div class="container">
    //     <div class="app-title">
    //         <p>Weather</p>
    //     </div>
    //     <div class="notification"> </div>
    //     <div class="weather-container">
    //         <div class="weather-icon">
    //             <img src="icons/unknown.png" alt="">
    //         </div>
    //         <div class="temperature-value">
    //             <p>- °<span>C</span></p>
    //         </div>
    //         <div class="temperature-description">
    //             <p> - </p>
    //         </div>
    //         <div class="location">
    //             <p>-</p>
    //         </div>
    //     </div>
    // </div>

    // let div = document.createElement('div.container')

    // let div = document.createElement('div');
    // div.className = 'container';
    // let text = document.createTextNode('Test');
    // div.appendChild(text);
    // document.body.appendChild(div)
    // let divContainer = document.querySelector('body:last-child').createElement('div.container')

    let pCity = document.querySelector('div.app-title p');
    pCity.textContent = weather.city_name;

    let img = document.querySelector("div.weather-icon img");
    let iconUrl = 'https://www.weatherbit.io/static/img/icons/' + weather.weather.icon + '.png';
    img.src = iconUrl;

    let ptemperature = document.querySelector('div.temperature-value p');
    ptemperature.textContent = weather.temp;

    let pDescription = document.querySelector('div.temperature-description p');
    pDescription.textContent = weather.weather.description;

    let pLocation = document.querySelector('div.location p');
    pLocation.textContent = '[' + weather.city_name + ', ' + weather.country_code + ']';

    let div = document.createElement('div');
    // div.className = 'container';

    duplicateChildNodes('body');
}

function handleErrors(response) {
    if (!response.ok) {
        throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
    }
    return response;
}

const getWeather = (latitude, longitude) => {
    const URL = `${urlBase}&lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
    fetch(URL)
        .then(handleErrors)
        .then(response => response.json())
        .then(render)
        .catch((error) => { console.log(error) })
}

function duplicateChildNodes(parentId) {
    var parent = document.querySelector(parentId);
    NodeList.prototype.forEach = Array.prototype.forEach;
    var children = parent.childNodes;
    children.forEach(function (item) {
        var cln = item.cloneNode(true);
        parent.appendChild(cln);
    });
};

// duplicateChildNodes("container");

// getUserPosition();

cities.forEach((city) => getWeather(city.latitude, city.longitude));