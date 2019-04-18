let latitude = 40.7128;
let longitude = -74.0060;
let setCity = "New York";
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Janury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemer', 'October', 'November', 'December'];
let d = new Date();
let day = d.getDay();

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('search_city');
if(myParam !== null){
    setCity = myParam;
    setCity.replace(' ','+');
    getCoords = "https://maps.googleapis.com/maps/api/geocode/json?address=" + setCity + "&key=AIzaSyBP_vSPz_pQKu85ebXxBQOu6YgwzM3hEg4";
    fetch(getCoords)
        .then(function (response){
            return response.json();
        })
        .then(function (myJson){
            latitude = myJson.results[0].geometry.location.lat;
            longitude = myJson.results[0].geometry.location.lng;
            let bod = document.getElementById('body');
            bod.innerHTML = latitude;
            setStuff(setCity);
        })
        .catch(err => {
            console.log("Caught an error");
            let bod = document.getElementById('body');
            bod.innerText = 'didnt werk';
        })
}
else if ("geolocation" in navigator) {
    function processCoords(position) {
        latitude = position.coords.latitude.toPrecision(6);
        longitude = position.coords.longitude.toPrecision(6);
        getCity = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&result_type=street_address&key=AIzaSyBP_vSPz_pQKu85ebXxBQOu6YgwzM3hEg4";
        fetch(getCity)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                city = myJson.results[0].formatted_address;
                getCity = city.split(',');
                setCity = getCity[getCity.length - 3];
                setStuff(setCity);
            })
    }
    navigator.geolocation.getCurrentPosition(processCoords)
}


const options = {
    // Required: API key
    key: 'OdmfsInVoRztyyPdXEihssKV5q00Tw42',
    // Put additional console output
    verbose: true,
    zoom: 15,
}
// Initialize Windy API
windyInit(options, windyAPI => {

    const { map } = windyAPI

    map.setView([latitude, longitude]);

});

function setStuff(setCity) {
    setCity.replace(' ', '+');
    let currentApi = "http://api.openweathermap.org/data/2.5/weather?q=" + setCity + "&APPID=d5c9b9ad602b9ee744107abb3dc8b54e&units=imperial";
    let alert = document.getElementById('city_name');

    fetch(currentApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            setCurrent(myJson);
        })
        .catch(err => {
            console.log("Caught an error");
            alert.innerHTML = "Invalid Request";
        });

    let forecastApi = "http://api.openweathermap.org/data/2.5/forecast?q=" + setCity + "&appid=d5c9b9ad602b9ee744107abb3dc8b54e&units=imperial";
    fetch(forecastApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            createRows(myJson);
        })
        .catch(err => {
            console.log('Caught an error');
        });
}


function createRows(data) {
    let body = document.getElementById('body');
    let counter = 0;
    for (let i = 0; i < data.list.length; i++) {
        let time = new Date(data.list[i].dt * 1000);
        counter++;
        let row = document.createElement('tr');
        row.dataset.toggle = 'collapse';
        row.dataset.target = '#test' + counter;
        row.classList.add('clickable');
        let icon = document.createElement('td')
        let day = document.createElement('td')
        let temp = document.createElement('td')
        icon.id = "avg" + counter;
        icon.innerHTML = data.list[i].main.temp + ' \xB0F.';
        day.innerHTML = weekday[time.getDay()];
        temp.innerHTML = setDate(data.list[i].dt_txt);
        if (i === 0) {
            temp.innerHTML = months[d.getMonth()] + " " + d.getDate();
        }
        row.appendChild(icon);
        row.appendChild(day);
        row.appendChild(temp);
        body.appendChild(row);
        let t_row = document.createElement('tr');
        let td = document.createElement('td');
        td.classList.add('hiddenRow');
        td.colSpan = '3';
        let div = document.createElement('div');
        div.classList.add('collapse');
        div.id = "test" + counter;
        let table = document.createElement('table');
        table.classList.add('table');
        table.classList.add('table-sm');
        let thead = document.createElement('thead');
        let headTr = document.createElement('tr');
        let headTemp = document.createElement('th');
        headTemp.innerHTML = "Temperature";
        let headTime = document.createElement('th');
        headTime.innerHTML = "Time";
        let headWind = document.createElement('th');
        headWind.innerHTML = "Wind Speed";
        let tbody = document.createElement('tbody');
        tbody.id = "body" + counter;
        let iter = 0;
        let avgTemp = 0;
        let changeTemp = document.getElementById('avg' + counter);
        while (i < data.list.length && (time.getHours() + (3 * iter) <= 24)) {
            let newTime = new Date(data.list[i].dt * 1000);
            let tr = document.createElement('tr');
            let icon = document.createElement('td')
            let day = document.createElement('td')
            let temp = document.createElement('td')
            if (parseInt(changeTemp.innerHTML) < data.list[i].main.temp) {
                changeTemp.innerHTML = data.list[i].main.temp + ' \xB0F.';
            }
            icon.innerHTML = data.list[i].main.temp + ' \xB0F.';
            day.innerHTML = setTime(newTime.getHours());
            temp.innerHTML = data.list[i].wind.speed.toFixed(0) + ' mph';
            tr.appendChild(icon);
            tr.appendChild(day);
            tr.appendChild(temp);
            tbody.appendChild(tr);
            iter++;
            i++;
        }
        i--;
        thead.appendChild(headTemp);
        thead.appendChild(headTime);
        thead.appendChild(headWind);
        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(table);
        td.appendChild(div);
        t_row.appendChild(td);
        body.appendChild(t_row);
    }
}

function setTime(time) {
    let ret;
    if (time - 12 < 0) {
        ret = time + ":00 AM";
    } else if (time - 12 === 0) {
        ret = "12:00 PM";
    } else {
        ret = time % 12 + ":00 PM";
    }
    return ret;
}

function setCurrent(weatherData) {
    document.getElementById('city_temp').innerHTML = weatherData.main.temp + '\xB0F.';
    document.getElementById('city_name').innerHTML = weatherData.name + ", " + weatherData.sys.country;
    document.getElementById('weather_desc').innerHTML = weatherData.weather[0].description;
    document.getElementById('temp_max').innerHTML = "High: " + weatherData.main.temp_max + ' \xB0F.';
    document.getElementById('temp_min').innerHTML = "Low:  " + weatherData.main.temp_min + ' \xB0F.';
    document.getElementById('humidity').innerHTML = "Humidity: " + weatherData.main.humidity + '%';
    document.getElementById('wind').innerHTML = "Wind: " + weatherData.wind.speed + ' mph';
}

function setForecast(data) {
    let table = document.getElementById('myTable');
    let body = document.getElementById('body');
    let row = document.createElement('tr');
    let icon = document.createElement('td')
    let day = document.createElement('td')
    let temp = document.createElement('td')
    icon.innerHTML = data.cod;
    day.innerHTML = "day";
    temp.innerHTML = "temp";
    body.appendChild(icon);
    body.appendChild(day);
    body.appendChild(temp);
    table.appendChild(row);
}

function setDate(data) {
    let month = data.substring(5, 7);
    let day = data.substring(8, 10);
    return months[parseInt(month) - 1] + " " + day;
}


