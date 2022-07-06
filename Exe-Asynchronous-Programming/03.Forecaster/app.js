function attachEvents() {
    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', getWeather);


}
async function getWeather() {
    document.getElementById('upcoming').innerHTML = '';
    document.querySelector("#current").innerHTML = '<div class="label">Current conditions</div>'
    
    let symbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°',

    }
    let inputField = document.getElementById('location').value;
    let searchedLocation = {};
    let forecastToday = {}
    let forecastUpcoming = {};
    try {
        let r1 = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
        let data = await r1.json();
        searchedLocation = Object.assign(data.find(e => e.name == inputField));
        let forecast = document.getElementById('forecast');
        forecast.style.display = 'inline';
        let r2 = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${searchedLocation.code}`)
        forecastToday = Object.assign(await r2.json());
       

        let r3 = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${searchedLocation.code}`)
        forecastUpcoming = Object.assign(await r3.json());
        
        createHtmlElements(forecastToday,forecastUpcoming,symbols);
    } catch (error) {
        console.log(error.message);
    }
}














function createHtmlElements(forecastTodayData,forecastUpcomingData,symbols){
    let [condition,high,low] = Object.values(forecastTodayData.forecast);
    let cityName = forecastTodayData.name;
    let current = document.getElementById('current');
    let divForecast = document.createElement('div');
    divForecast.className = 'forecasts';
    let spanSymbol = document.createElement('span');
    spanSymbol.textContent = symbols[condition];
    spanSymbol.className = 'condition symbol'
    divForecast.appendChild(spanSymbol);
    current.appendChild(divForecast);

    let forecastSpan = document.createElement('span');
    forecastSpan.className = 'condition';

    let citySpan = document.createElement('span');
    citySpan.className = 'forecast-data';
    citySpan.textContent = cityName;

    let degreesSpan = document.createElement('span');
    degreesSpan.className = 'forecast-data';
    degreesSpan.textContent = `${low}${symbols.Degrees}/${high}${symbols.Degrees}`

    let conditionSpan = document.createElement('span');
    conditionSpan.className = 'forecast-data';
    conditionSpan.textContent = condition;

    forecastSpan.appendChild(citySpan);
    forecastSpan.appendChild(degreesSpan);
    forecastSpan.appendChild(conditionSpan);
    divForecast.appendChild(forecastSpan);

// upcoming
    let upcomingForecast = document.getElementById('upcoming');

    let divUpcomingForecast = document.createElement('div');
    divUpcomingForecast.className = 'forecast-info';

    for (const current of forecastUpcomingData.forecast) {
      let [condition,high,low] = Object.values(current);
      let upcomingSpan = document.createElement('span');
      upcomingSpan.className = 'upcoming';

      let symbolSpan = document.createElement('span');
      symbolSpan.className = 'symbol';
      symbolSpan.textContent = symbols[condition];

      let degreesSpan = document.createElement('span');
      degreesSpan.className = 'forecast-data';
      degreesSpan.textContent = `${low}${symbols.Degrees}/${high}${symbols.Degrees}`

      let conditionSpan = document.createElement('span');
      conditionSpan.className = 'forecast-data';
      conditionSpan.textContent = condition;

      upcomingSpan.appendChild(symbolSpan);
      upcomingSpan.appendChild(degreesSpan);
      upcomingSpan.appendChild(conditionSpan);

      divUpcomingForecast.appendChild(upcomingSpan);
    }
    upcomingForecast.appendChild(divUpcomingForecast);
}

attachEvents();