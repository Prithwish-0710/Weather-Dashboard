import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../utils/api";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const res = await getWeather(city);
    return res.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    unit: "metric",
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "metric" ? "imperial" : "metric";
    },
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        (c) => c.name === action.payload.name
      );
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (c) => c.name !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      const name = action.payload.name;

      const idx = state.cities.findIndex((c) => c.name === name);
      if (idx !== -1) state.cities[idx] = action.payload;
      else state.cities.push(action.payload);

      const favIdx = state.favorites.findIndex((c) => c.name === name);
      if (favIdx !== -1) {
        state.favorites[favIdx] = action.payload;
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    });
  },
});

export const { toggleUnit, addFavorite, removeFavorite } =
  weatherSlice.actions;
export default weatherSlice.reducer;