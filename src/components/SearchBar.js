import React, { useState, useEffect } from "react";
import { getCitySuggestions } from "../utils/api";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (city.length > 2) {
        getCitySuggestions(city).then((res) => {
          const unique = [];
          const seen = new Set();

          res.data.forEach((item) => {
            const key = item.name + item.country;
            if (!seen.has(key)) {
              seen.add(key);
              unique.push(item);
            }
          });

          setSuggestions(unique);
        });
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [city]);

  return (
    <div className="search-bar">
      <div style={{ position: "relative" }}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
        />

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => {
                  onSearch(s.name);
                  setCity("");
                  setSuggestions([]);
                }}
              >
                {s.name}, {s.country}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={() => onSearch(city)}>Search</button>
    </div>
  );
};

export default SearchBar;