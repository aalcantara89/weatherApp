let areaDataField = document.getElementById('searchField');
const submitBtn = document.getElementById('submitCityBtn');
const weatherDataDiv = document.getElementById('currentWeather');

async function getWeather(){
    const areaData = areaDataField.value;
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=b586bdeaf30f413f9fc233209233010&q=' + areaData, {mode:'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    return displayData(weatherData)
}
async function getForecast(){
    const areaData = areaDataField.value;
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=b586bdeaf30f413f9fc233209233010&q=' + areaData + '&' + 'days=3&aqi=no&alerts=no', {mode:'cors'});
    const forecastData = await response.json();
    console.log(forecastData.forecast.forecastday);
    return displayforecastData(forecastData)
}
function displayData(data) {
    let condition = 'The current conditions are: ' + data.current.condition.text + '.';
    let temp = 'The current temp is ' + data.current.temp_f + 'F.';
    const p = document.createElement('p');
    p.textContent = condition + ' ' + temp;
    weatherDataDiv.appendChild(p);
    console.log 

}
function displayforecastData(data) {
    let forecastData = data.forecast.forecastday;

  // Define an array to store the mapped data
  let dataMapped = forecastData.map(threeDayForecast => {
    let astro = threeDayForecast.astro;
    let day = threeDayForecast.day.condition;
    let hour = threeDayForecast.hour.time;
    return `Astro: ${JSON.stringify(astro)}, Day: ${JSON.stringify(day)}, Hour: ${JSON.stringify(hour)}`;
  });

  // Iterate over the mapped data and append it to the DOM
  dataMapped.forEach(dataString => {
    const p = document.createElement('p');
    p.textContent = dataString;
    forecast.appendChild(p);
  });
    // for(let i=0; i < forecastData.length; i++) {
    //     let astro = threeDayForecast.astro;
    //     let day = threeDayForecast.day.condition;
    //     let hour = threeDayForecast.hour.time;

    //     const p = document.createElement('p');
    //      p.textContent = dataString;
    //      forecast.appendChild(p);  
    // }
    
}
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather();
    getForecast()
    areaDataField.value = '';
})