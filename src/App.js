import React from 'react';
import './App.css';
// import { thisExpression } from '@babel/types';

// tbd 
// allow flipping between celcius and fahrenheit
// form validation and error handling

function App() {
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
      this.fetchWeather.bind(this);
    }

    fetchWeather() {
      const that = this;
      const key = '8f098395e4b8a5cafd82f5af39e50048'
      let newLocale = document.querySelector("input");
      // let locationID =  "524901";
      let city = newLocale.value;
      console.log(city);
      const callAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${key}`;
      // need to get city location from user and convert to id somehow.

      function convertToCelcius(num) {
        return Math.round(num - 273.15);
      }
      function convertToFahrenheit(num) {
        return Math.round(num * 9/5 + 32);
      }
      let currentWeather = this.state;
      // add error handling
        fetch (callAPI, {mode: 'cors'}) 
          .then(function(response) {
            return response.json();
          })
          .then(function (response) {
            // create object 
            // set data
            const main = response.list[0].main;
            const condition = response.list[0].weather[0].description;
            const humidity = response.list[0].main.humidity;
            const wind = response.list[0].wind.speed;

            // set current weather
            currentWeather.weather.temp = convertToFahrenheit(convertToCelcius(main.temp))
            currentWeather.weather.low = convertToFahrenheit(convertToCelcius(main.temp_min));
            currentWeather.weather.high = convertToFahrenheit(convertToCelcius(main.temp_max));
            currentWeather.weather.condition = condition;
            currentWeather.weather.humidity = humidity;
            currentWeather.weather.wind = wind;
            that.setState({ }); /* update state */
          })
      return;
    }
    render () {
      return (
        <div>
          <div> 
            <p> Please enter a city to see current weather </p>
            <input type="text"></input>
             </div>
          <div> current temp {this.state.weather.temp} </div>
          <div> low {this.state.weather.low} </div>
          <div> high {this.state.weather.high} </div>
          <div> {this.state.weather.condition} </div>
          <div> wind {this.state.weather.wind} mph </div>
          <div> {this.props.books} </div>
          <button onClick={() => this.fetchWeather()}> update </button>
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
