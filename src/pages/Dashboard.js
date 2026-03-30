import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, toggleUnit } from "../redux/weatherSlice";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { cities, favorites, unit } = useSelector((s) => s.weather);

  const handleSearch = (city) => {
    if (city) dispatch(fetchWeather(city));
  };

  // 🔁 AUTO REFRESH
  useEffect(() => {
    const interval = setInterval(() => {
      cities.forEach((c) => dispatch(fetchWeather(c.name)));
      favorites.forEach((c) => dispatch(fetchWeather(c.name)));
    }, 60000);

    return () => clearInterval(interval);
  }, [cities, favorites, dispatch]);

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>

      {/* 🔍 SEARCH BAR */}
      <SearchBar onSearch={handleSearch} />

      {/* 🌡 TOGGLE */}
      <div className="toggle-container">
        <button onClick={() => dispatch(toggleUnit())}>
          Switch to {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      {/* ⭐ FAVORITES */}
      <h2>⭐ Favorites</h2>
      <div className="grid">
        {favorites.map((c, i) =>
          c ? <WeatherCard key={i} data={c} /> : null
        )}
      </div>

      {/* 🌍 ALL CITIES */}
      <h2>🌍 All Cities</h2>
      <div className="grid">
        {cities.map((c, i) =>
          c ? <WeatherCard key={i} data={c} /> : null
        )}
      </div>
    </div>
  );
};

export default Dashboard;