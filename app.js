// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)

const API_KEY = '63727bfa5b324cce98dfb8d2c9fd3f38'
const urlBase = 'https://api.weatherbit.io/v2.0/current?'

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

const render = (responseJson) => {

    let weatherObj = responseJson.data[0];
    console.log('Success: ');
    console.log(weatherObj);

    let city = weatherObj.city_name;
    let temperature = weatherObj.temp + '°C';
    let iconUrl = 'https://www.weatherbit.io/static/img/icons/' + weatherObj.weather.icon + '.png';
    let description = weatherObj.weather.description;
    let location = '[' + weatherObj.city_name + ', ' + weatherObj.country_code + ']';
    let notification = "";
    error = false;
    renderCard(city, notification, temperature, iconUrl, description, location, error);
}

const renderCard = (city, notification, temperature, iconUrl, description, location, error) => {

//     <!-- <div class="card">
//     <div class="city">
//         <p>City</p>
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
// </div> -->

    const card = document.createElement("div");
    card.className = "container";
    document.querySelector("#cards").appendChild(card);

    const divCity = document.createElement("div");
    divCity.className = "city";
    card.appendChild(divCity);

    const pCity = document.createElement("p");
    pCity.className = "city p";
    divCity.appendChild(pCity);


    const notificationEl = document.createElement("p");
    notificationEl.className = "notification";
    card.appendChild(notificationEl);

    const iconEl = document.createElement("img");
    iconEl.className = "weather-icon";
    card.appendChild(iconEl);

    const tempEl = document.createElement("p");
    tempEl.className = "temperature-value";
    card.appendChild(tempEl);

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "temperature-description";
    card.appendChild(descriptionEl);

    const locationEl = document.createElement("p");
    locationEl.className = "location";
    card.appendChild(locationEl);

    //Adding the information to the card 
    if (error === true) {
        pCity.innerHTML = "-";
        notificationEl.innerHTML = "Hay un problema";
        iconEl.src = "img/icons/unknown.png";
        tempEl.innerHTML = `- ºC`;
        descriptionEl.innerHTML = "-";
        locationEl.innerHTML = "-";
    } else {
        pCity.innerHTML = city;
        notificationEl.innerHTML = notification;
        iconEl.src = iconUrl;
        tempEl.innerHTML = temperature;
        descriptionEl.innerHTML = description;
        locationEl.innerHTML = location;
    }
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


// cities.forEach((city) => getWeather(city.latitude, city.longitude));

getWeather(41.390205, 2.154007);