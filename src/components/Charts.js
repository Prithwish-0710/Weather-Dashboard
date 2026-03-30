import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { useSelector } from "react-redux";

// 🔥 CUSTOM TOOLTIP
const CustomTooltip = ({ active, payload, label }) => {
  const { unit } = useSelector((state) => state.weather);

  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const temp =
      unit === "metric"
        ? data.temp
        : (data.temp * 9) / 5 + 32;

    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          borderRadius: "10px",
          color: "#000",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <p><strong>Time:</strong> {label}</p>
        <p>🌡 Temp: {temp.toFixed(1)}°{unit === "metric" ? "C" : "F"}</p>
        <p>🌧 Rain: {data.rain || 0} mm</p>
        <p>🌬 Wind: {data.wind || 0} m/s</p>
      </div>
    );
  }

  return null;
};

// 🌡 TEMP CHART
export const TempChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="temp" stroke="#fff" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
);

// 🌧 RAIN CHART
export const RainChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="rain" fill="#00f2fe" />
    </BarChart>
  </ResponsiveContainer>
);

// 🌬 NEW WIND CHART (FINAL MISSING PART)
export const WindChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="wind" stroke="#00ffcc" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
);