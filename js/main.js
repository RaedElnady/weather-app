
let allData,
    countryName = document.getElementById('country-name'),
    cityName = document.getElementById('city-name'),
    localTime = document.getElementById('local-time'),
    sunriseTime = document.getElementById('sunrise-time'),
    sunsetTime = document.getElementById('sunset-time'),
    uvIndex = document.getElementById('uv-index'),
    uvStatus = document.getElementById('uv-status'),
    pressureMb = document.getElementById('pressure-mb'),
    visibilityKm = document.getElementById('visibility-km'),
    humidityPercent = document.getElementById('humidity-percent'),
    windDegree = document.getElementById('wind-degree'),
    windSpeed = document.getElementById('wind-kph'),
    windDirection = document.getElementById('wind-dir'),
    weatherStatus = document.getElementById('weather-status'),
    maxTemp = document.getElementById('max-temp'),
    minTemp = document.getElementById('min-temp'),
    feelLike = document.getElementById('feel-like'),
    weatherDayIcon = document.getElementById('weather-day-icon'),
    searchInput = document.getElementById('search-input'),
    searchSubmit = document.getElementById('search-submit');
    
function initAPI(targetCity){
  var httpRequest=new XMLHttpRequest();
  httpRequest.open('GET',`http://api.weatherapi.com/v1/forecast.json?key=5c413e681c6145cb9a264149222706&q=${targetCity}&days=6&aqi=no&alerts=n/`);
  httpRequest.send();

  httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState==4){
        allData = JSON.parse(httpRequest.response);
        displayMainData()
        displayHoulyData(4);
        displayHoulyData(8);
        displayHoulyData(12);
        displayHoulyData(16);
        displayHoulyData(20);
    }
});

}

initAPI('doha');

searchSubmit.addEventListener('click',function(){
  initAPI(searchInput.value)
})

searchInput.addEventListener('keypress',function(e){
  if (e.keyCode === 13){
    initAPI(searchInput.value)
  }
})


function displayMainData(){
  
  pressureMb.innerHTML=allData.current.pressure_mb;
  visibilityKm.innerHTML=allData.current.vis_km;
  humidityPercent.innerHTML=allData.current.humidity;
  uvIndex.innerHTML=allData.current.uv;
  checkUvStatus(allData.current.uv);
  sunriseTime.innerHTML=allData.forecast.forecastday[0].astro.sunrise;
  sunsetTime.innerHTML=allData.forecast.forecastday[0].astro.sunset;
  localTime.innerHTML=allData.location.localtime;
  cityName.innerHTML=allData.location.name;
  countryName.innerHTML=allData.location.country;
  windDegree.innerHTML=allData.current.wind_degree;
  windDirection.innerHTML=allData.current.wind_dir;
  windSpeed.innerHTML=allData.current.wind_kph;
  feelLike.innerHTML=allData.current.feelslike_c;
  maxTemp.innerHTML=allData.forecast.forecastday[0].day.maxtemp_c;
  minTemp.innerHTML=allData.forecast.forecastday[0].day.mintemp_c;
  weatherStatus.innerHTML=allData.forecast.forecastday[0].day.condition.text;
  weatherDayIcon.src=allData.forecast.forecastday[0].day.condition.icon;

}
function displayHoulyData(hour){
  let hourStatus = document.querySelector(`#day-h-${hour} .day-h-status`),
      hourIcon = document.querySelector(`#day-h-${hour} .day-h-icon`),
      hourMaxTemp = document.querySelector(`#day-h-${hour} .day-h-max-temp`);

  hourStatus.innerHTML=allData.forecast.forecastday[0].hour[hour].condition.text
  hourMaxTemp.innerHTML=allData.forecast.forecastday[0].hour[hour].temp_c
  hourIcon.src=allData.forecast.forecastday[0].hour[hour].condition.icon

}



function checkUvStatus(index){
  if(index>=8){
    uvStatus.innerHTML='Very High'
  }
  else if(index>=6){
    uvStatus.innerHTML='High'
  }
  else if(index>=3){
    uvStatus.innerHTML='Moderate'
  }
  else{
    uvStatus.innerHTML='Low'
  }
  
}

setInterval(myTimer, 1000);

function myTimer() {
  const date = new Date();
  document.getElementById("currentTime").innerHTML = date.toLocaleTimeString();
  document.getElementById("currentDate").innerHTML = date.toDateString();
}

