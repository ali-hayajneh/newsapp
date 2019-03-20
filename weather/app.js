new URL(location.href).searchParams.get('something')

const params = new URL(location.href).searchParams;
const year = params.get('something');
city = document.getElementById('get_weather').value;
var currentApi = "http://api.openweathermap.org/data/2.5/weather?q=" + year + "&APPID=d5c9b9ad602b9ee744107abb3dc8b54e&units=imperial";
var alert = document.getElementById('city_name');

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

var forecastApi = "http://api.openweathermap.org/data/2.5/forecast?q=" + year + "&appid=d5c9b9ad602b9ee744107abb3dc8b54e&units=imperial";
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

var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['Janury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemer', 'October', 'November', 'December'];
var d = new Date();
var day = d.getDay();

function createRows(data) {
    var body = document.getElementById('body');
    var counter = 0;
    for (var i = 0; i < data.list.length; i++) {
        var time = new Date(data.list[i].dt * 1000);
        counter++;
        var row = document.createElement('tr');
        row.dataset.toggle = 'collapse';
        row.dataset.target = '#test' + counter;
        row.classList.add('clickable');
        var icon = document.createElement('td')
        var day = document.createElement('td')
        var temp = document.createElement('td')
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
        var row = document.createElement('tr');
        var td = document.createElement('td');
        td.classList.add('hiddenRow');
        td.colSpan = '3';
        var div = document.createElement('div');
        div.classList.add('collapse');
        div.id = "test" + counter;
        var table = document.createElement('table');
        table.classList.add('table');
        table.classList.add('table-sm');
        var thead = document.createElement('thead');
        var headTr = document.createElement('tr');
        var headTemp = document.createElement('th');
        headTemp.innerHTML = "Temperature";
        var headTime = document.createElement('th');
        headTime.innerHTML = "Time";
        var headWind = document.createElement('th');
        headWind.innerHTML = "Wind Speed";
        var tbody = document.createElement('tbody');
        tbody.id = "body" + counter;
        var iter = 0;
        var avgTemp = 0;
        var changeTemp = document.getElementById('avg' + counter);
        while (i < data.list.length && (time.getHours() + (3 * iter) <= 24)) {
            var newTime = new Date(data.list[i].dt * 1000);
            var tr = document.createElement('tr');
            var icon = document.createElement('td')
            var day = document.createElement('td')
            var temp = document.createElement('td')
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
        row.appendChild(td);
        body.appendChild(row);

    }
}

function setTime(time) {
    var ret;
    if (time - 12 < 0) {
        ret = time + ":00 AM";
    }
    else if (time - 12 === 0) {
        ret = "12:00 PM";
    }
    else {
        ret = time % 12 + ":00 PM";
    }
    return ret;
}

// document.getElementById('btn_weather').addEventListener("click", () => {
//     new URL(location.href).searchParams.get('something')
// // Returns 2008 for href = "http://localhost/search.php?year=2008".
// // Or in two steps:
//     const params = new URL(location.href).searchParams;
//     const year = params.get('something');
//     city = document.getElementById('get_weather').value;
//     document.getElementById('test').innerHTML = '123';
//     var api = "http://api.openweathermap.org/data/2.5/weather?q=" + year + "&APPID=d5c9b9ad602b9ee744107abb3dc8b54e&units=imperial";
//     fetch(api)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(myJson){
//         weatherCallback(myJson);
//     });


// });

function setCurrent(weatherData) {
    document.getElementById('city_temp').innerHTML = weatherData.main.temp + ' \xB0F.';
    document.getElementById('city_name').innerHTML = weatherData.name + ", " + weatherData.sys.country;
    document.getElementById('weather_desc').innerHTML = weatherData.weather[0].description;
    document.getElementById('temp_max').innerHTML = "Max Temp: " + weatherData.main.temp_max;
    document.getElementById('temp_min').innerHTML = "Min Temp: " + weatherData.main.temp_min;
    document.getElementById('humidity').innerHTML = "Humidity: " + weatherData.main.humidity;
    document.getElementById('wind').innerHTML = "Wind Speed: " + weatherData.wind.speed;
}

function setForecast(data) {
    var table = document.getElementById('myTable');
    var body = document.getElementById('body');
    var row = document.createElement('tr');
    var icon = document.createElement('td')
    var day = document.createElement('td')
    var temp = document.createElement('td')
    icon.innerHTML = data.cod;
    day.innerHTML = "day";
    temp.innerHTML = "temp";
    body.appendChild(icon);
    body.appendChild(day);
    body.appendChild(temp);
    table.appendChild(row);
}

function setDate(data) {
    var month = data.substring(5, 7);
    var day = data.substring(8, 10);
    return months[parseInt(month) - 1] + " " + day;
}


console.log(document.getElementsByTagName('html')[0].innerHTML);


