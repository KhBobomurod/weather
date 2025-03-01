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
        "https://api.weatherapi.com/v1/current.json?key=160bf3754ddf46bb878164043252402&q=Uzbekistan&aqi"
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
        `https://api.weatherapi.com/v1/current.json?key=160bf3754ddf46bb878164043252402&q=${input}&aqi`
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
        <input
          value={input}
          className="search-input"
          onChange={searchInput}
          type="text"
          placeholder="Enter a city"
        />
        <button className="search-btn" onClick={searchBtn}>
          Search
        </button>
      </div>
      {weather && (
        <div className="weather-info">
          <p>
            <b>Shahar/Tuman: </b>
            {weather.location.name}
          </p>
          <p>
            <b>Viloyat: </b>
            {weather.location.region}
          </p>
          <p>
            <b>Mamlakat: </b>
            {weather.location.country}
          </p>
          <p>
            <b>Qi'ta: </b>
            {weather.location.tz_id}
          </p>
          <p>
            <b>Harorat: </b>
            {weather.current.temp_c}
            <sup>o</sup>C
          </p>
          <p>
            <b>Namlik: </b>
            {weather.current.humidity}
          </p>
          <p>
            <b>Shamol tezligi: </b>
            {weather.current.wind_kph} km/s
          </p>
          <img src={weather.current.condition.icon} alt="Weather icon" />
        </div>
      )}
    </div>
  );
}

export default App;
