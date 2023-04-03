const app = document.querySelector('.weather-app')
const temp = document.querySelector('.temp')
const dateOutput = document.querySelector('.date')
const timeOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidty')
const windOutput = document.querySelector('.wind')
const form = document.querySelector('#locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')


let cityInput = "Tashkent";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        fetchWeatherData()
        app.style.opacity = ".1"
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value.length == 0) {
        alert('Please type city name in the input...')
    } else {
        cityInput = search.value;
        search.value = ""
        fetchWeatherData()
        app.style.opacity = ".1"
    }
})

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=aaa19a6a714343849ef113953232803&q=${cityInput}&aqi=yes`)
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            temp.innerHTML = data.current.temp_c + '&#176;';
            conditionOutput.innerHTML = data.current.condition.text;

            dateOutput.innerHTML = data.location.localtime;

            nameOutput.innerHTML = data.location.name;
            let icondId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = './icons/' + icondId;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night"
            }

            if (code == 1000) {
                app.style.backgroundImage = `url(./image/${timeOfDay}/clear.jpg)`;
            }
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./image/${timeOfDay}/cloudy.jpg)`;
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./image/${timeOfDay}/rainy.jpg)`;
            }
            else {
                app.style.backgroundImage = `url(./image/${timeOfDay}/snowy.jpg)`;
            }
            app.style.opacity = "1"
        })

        .catch(() => {
            alert("City not found, please try again...")
            app.style.opacity = "1"
        })
}

fetchWeatherData()
app.style.opacity = "1";