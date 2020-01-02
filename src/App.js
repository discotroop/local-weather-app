import React from 'react';
import logo from './logo.svg';
import './App.css';





function App() {
  const key = '8f098395e4b8a5cafd82f5af39e50048'
  console.log(key);
  const callAPI = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + key;
  console.log(callAPI); 

  fetch (callAPI, {mode: 'cors'}) 
    .then(function(response) {
      return response.json();
    })
    .then(function (response) {
      const main = response.list[0].main;
      return main;
    })
    .then(function(main) {
      console.log("It is is ", main.temp);
    })

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
