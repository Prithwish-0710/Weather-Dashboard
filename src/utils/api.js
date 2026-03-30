import axios from "axios";

const API_KEY = "18de455a9d42959775385a5823a2bb43";

// 🔥 SIMPLE CACHE (60 sec)
const cache = {};

const getCached = (key) => {
  const item = cache[key];
  if (item && Date.now() - item.time < 60000) return item.data;
  return null;
};

const setCache = (key, data) => {
  cache[key] = { data, time: Date.now() };
};

export const getWeather = async (city) => {
  const key = `weather-${city}`;
  const cached = getCached(key);
  if (cached) return { data: cached };

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  setCache(key, res.data);
  return res;
};

export const getForecast = async (city) => {
  const key = `forecast-${city}`;
  const cached = getCached(key);
  if (cached) return { data: cached };

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  setCache(key, res.data);
  return res;
};

export const getCitySuggestions = (query) => {
  return axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
};