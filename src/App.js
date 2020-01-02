import React from 'react';
import logo from './logo.svg';
import './App.css';


// kelvin to fahrenhiet
// (k - 273.15) * 9/5 + 32 = F

// kelvin to celcius
// k - 273.15 = C

// run convert to celcius
// then run convert to fahrenheit if needed


function App() {
  const key = '8f098395e4b8a5cafd82f5af39e50048'
  let locationID =  "524901";
  const callAPI = `http://api.openweathermap.org/data/2.5/forecast?id=${locationID}&APPID=${key}`;
  // need to get city location from user and convert to id somehow.

  function convertToCelcius(num) {
    return Math.round(num - 273.15);
  }
  function convertToFahrenheit(num) {
    return Math.round(num * 9/5 + 32);
  }

  let currentWeather = {
    temp: 30,
    humidity: "",
    wind: "",
    condition: "sunny",
    // etc etc.
  }
  fetch (callAPI, {mode: 'cors'}) 
    .then(function(response) {
      return response.json();
    })
    .then(function (response) {
      // get data
      const main = response.list[0].main;
      const condition = response.list[0].weather[0].description;
      const humidity = response.list[0].main.humidity;
      const wind = response.list[0].wind.speed

      // set current weather
      currentWeather.temp = convertToFahrenheit(convertToCelcius(main.temp))
      currentWeather.condition = condition;
      currentWeather.humidity = humidity;
      currentWeather.wind = wind;

      return (currentWeather);
    })
    .then(function(currentWeather) {
      console.log(currentWeather)
    })

  console.log(currentWeather)

  // Ok api call can get temperature, need to grab other relevant data
    // temp, humidity, wind, clear/cloudy/etc.
  // then set that data to an object
  // then paint that object onto screen ?
  // store object in state in react?

  const sampel = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY} "
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
