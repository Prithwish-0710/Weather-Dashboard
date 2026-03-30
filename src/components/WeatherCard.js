import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/weatherSlice";
import { useNavigate } from "react-router-dom";

const WeatherCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, unit } = useSelector((s) => s.weather);

  if (!data || !data.main) return null;

  const isFav = favorites.find((c) => c.name === data.name);

  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // 🔥 TEMP CONVERSION
  const tempC = data.main.temp;
  const temp =
    unit === "metric"
      ? tempC
      : (tempC * 9) / 5 + 32;

  const feelsLike =
    unit === "metric"
      ? data.main.feels_like
      : (data.main.feels_like * 9) / 5 + 32;

  return (
    <div className="card" onClick={() => navigate(`/details/${data.name}`)}>
      <h3>{data.name}</h3>

      <img src={iconUrl} alt="weather" />

      <p>
        🌡 {temp.toFixed(1)}°
        {unit === "metric" ? "C" : "F"}
      </p>

      <p>🤔 Feels like: {feelsLike.toFixed(1)}°</p>

      <p>💧 Humidity: {data.main.humidity}%</p>

      <p>🌬 Wind: {data.wind.speed.toFixed(2)} m/s</p>

      {/* 🔥 NEW STATS */}
      <p>📊 Pressure: {data.main.pressure} hPa</p>
      <p>👁 Visibility: {(data.visibility / 1000).toFixed(1)} km</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          isFav
            ? dispatch(removeFavorite(data.name))
            : dispatch(addFavorite(data));
        }}
      >
        {isFav ? "❌ Remove" : "⭐ Favorite"}
      </button>
    </div>
  );
};

export default WeatherCard;