import React from 'react';
import './App.css';
import { thisExpression } from '@babel/types';

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

  function getWeather () {
  fetch (callAPI, {mode: 'cors'}) 
    .then(function(response) {
      return response.json();
    })
    .then(function (response) {
      // create object 
      let currentWeather = {
        temp: 30,
        humidity: 5,
        wind: 5,
        condition: "sunny",
        high: 0,
        low: 0
      }
      // set data
      const main = response.list[0].main;
      const condition = response.list[0].weather[0].description;
      const humidity = response.list[0].main.humidity;
      const wind = response.list[0].wind.speed;

      // set current weather
      currentWeather.temp = convertToFahrenheit(convertToCelcius(main.temp))
      currentWeather.low = convertToFahrenheit(convertToCelcius(main.temp_min));
      currentWeather.high = convertToFahrenheit(convertToCelcius(main.temp_max));
      currentWeather.condition = condition;
      currentWeather.humidity = humidity;
      currentWeather.wind = wind;

      return (currentWeather);
    })
    .then(function(currentWeather) {
      console.log(currentWeather, "inside fetch")
      return currentWeather;
    })
  }

  function testing (props) {
    console.log("testing")
  }

  class Weather extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        weather: {
          temp: 30,
          humidity: 5,
          wind: 5,
          condition: "sunny",
          high: 0,
          low: 0
        }
      }
    }

    componentDidMount () {
      testing();
      let current = getWeather();
      console.log(current);
      // might need to move this back out of the component come to think
      // of it... just to get user input on location ? 
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
      // const that = this;

      fetch (callAPI, {mode: 'cors'}) 
      .then(function(response) {
        return response.json();
      })
      .then(response => {
        // create object 
        let currentWeather = {
          temp: 30,
          humidity: 5,
          wind: 5,
          condition: "sunny",
          high: 0,
          low: 0
        }
        // set data
        const main = response.list[0].main;
        const condition = response.list[0].weather[0].description;
        const humidity = response.list[0].main.humidity;
        const wind = response.list[0].wind.speed;
  
        // set current weather
        currentWeather.temp = convertToFahrenheit(convertToCelcius(main.temp))
        currentWeather.low = convertToFahrenheit(convertToCelcius(main.temp_min));
        currentWeather.high = convertToFahrenheit(convertToCelcius(main.temp_max));
        currentWeather.condition = condition;
        currentWeather.humidity = humidity;
        currentWeather.wind = wind;
  
        return currentWeather;
      })
      .then (currentWeather => {
        this.setState({ weather: currentWeather});
      });
    }
    
    render () {
      return (
        <div>
          <div> testing </div>
          <div> current temp {this.state.weather.temp} </div>
          <div> low {this.state.weather.low} </div>
          <div> high {this.state.weather.high} </div>
          <div> {this.state.weather.condition} </div>
          <div> wind {this.state.weather.wind} </div>
        </div>
      );
    }
  }
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
