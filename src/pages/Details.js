import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForecast, getWeather } from "../utils/api";
import { TempChart, RainChart, WindChart } from "../components/Charts";

const Details = () => {
  const { city } = useParams();

  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    // 🔥 CURRENT DATA (for extra stats)
    getWeather(city).then((res) => {
      setCurrent(res.data);
    });

    // 🔥 FORECAST
    getForecast(city).then((res) => {
      const list = res.data.list;

      // HOURLY
      setHourly(
        list.slice(0, 8).map((i) => ({
          time: i.dt_txt.split(" ")[1],
          temp: i.main.temp,
          rain: i.rain?.["3h"] || 0,
          wind: i.wind.speed,
        }))
      );

      // DAILY
      const map = {};
      list.forEach((i) => {
        const d = i.dt_txt.split(" ")[0];
        if (!map[d]) map[d] = { temp: [], rain: 0 };

        map[d].temp.push(i.main.temp);
        map[d].rain += i.rain?.["3h"] || 0;
      });

      setDaily(
        Object.keys(map).slice(0, 5).map((d) => ({
          date: d,
          temp: map[d].temp.reduce((a, b) => a + b) / map[d].temp.length,
          rain: map[d].rain,
        }))
      );
    });
  }, [city]);

  return (
    <div className="container">
      <h2>{city} Forecast</h2>

      {/* 🔥 EXTRA STATS */}
      {current && (
        <div className="grid">
          <div className="card">
            <p>🌡 Temp: {current.main.temp}°C</p>
            <p>🤔 Feels Like: {current.main.feels_like}°C</p>
            <p>📊 Pressure: {current.main.pressure} hPa</p>
            <p>💧 Humidity: {current.main.humidity}%</p>
            <p>👁 Visibility: {(current.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      )}

      {/* CHARTS */}
      <h3 style={{ color: "white" }}>Temperature</h3>
      <TempChart data={hourly} />

      <h3 style={{ color: "white" }}>Rainfall</h3>
      <RainChart data={hourly} />

      <h3 style={{ color: "white" }}>Wind Speed</h3>
      <WindChart data={hourly} />

      {/* DAILY */}
      <h3 style={{ color: "white" }}>5-Day Forecast</h3>
      <div className="grid">
        {daily.map((d, i) => (
          <div className="card" key={i}>
            <p>{d.date}</p>
            <p>🌡 {d.temp.toFixed(1)}°C</p>
            <p>🌧 {d.rain} mm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;