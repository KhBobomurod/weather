import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  // state
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  // useEffect
  useEffect(() => {
    axios
      .get(
        "https://api.weatherapi.com/v1/current.json?key=13851a9789f84228ba7172143251702&q=Moscow&aqi=no"
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // events
  const searchInput = (e) => {
    setInput(e.target.value);
  };
  const searchBtn = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=13851a9789f84228ba7172143251702&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search">
        <input value={input} className="search-input" onChange={searchInput} type="text" placeholder="Enter a city" />
        <button className="search-btn" onClick={searchBtn}>Search</button>
      </div>
      {weather && (
        <div className="weather-info">
          <p>
            <b>Country: </b>
            {weather.location.country}
          </p>
          <p>
            <b>Region: </b>
            {weather.location.region}
          </p>
          <p>
            <b>TZ: </b>
            {weather.location.tz_id}
          </p>
          <img
            src={weather.current.condition.icon}
            alt="Weather icon"
          />
          <p>
            <b>Temperature: </b>
            {weather.current.temp_c}
            <sup>o</sup>C
          </p>
          <p>
            <b>Humidity: </b>
            {weather.current.humidity}
          </p>
          <p>
            <b>Wind: </b>
            {weather.current.wind_kph}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
