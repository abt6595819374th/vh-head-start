import React, { useState, useEffect, useRef } from 'react';
import CityWeatherForecast from '../CityWeatherForecast';
import SearchIcon from '../SearchIcon';
import useGeolocation from '../hooks/useGeolocation';
import useLocationCity from '../hooks/useLocationCity';
import useWeatherData from '../hooks/useWeatherData';
import './styles.css';

const WeatherBlock = () => {
  const [city, setCity] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const pendingSearchRef = useRef<string | null>(null);
    
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  const { city: locationCity, loading: cityLoading } = useLocationCity(latitude, longitude);
  const { weather, loading: weatherLoading, error: weatherError } = useWeatherData(city);

  useEffect(() => {
    if (locationCity && !locationError) {
      setCity(locationCity);
    }
  }, [locationCity, locationError]);

  // Clear search input after weather data is successfully fetched
  useEffect(() => {
    if (!weatherLoading && !weatherError && pendingSearchRef.current) {
      setSearchInput('');
      pendingSearchRef.current = null;
    }
  }, [weatherLoading, weatherError]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      pendingSearchRef.current = trimmedInput;
      setCity(trimmedInput);
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSearch} className="weather-container__form">
        <div className="weather-container__input-container">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city or airport"
            className="weather-container__input"
          />
          <button
            type="submit"
            className="weather-container__search-icon"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      {!city && !locationLoading && !cityLoading && (
        <div className="weather-container__info-text">
          <p>Search for a city or airport to see weather information, or allow location access to get weather for your current location.</p>
        </div>
      )}
      {(locationLoading || cityLoading) && (
        <div className="weather-container__info-text">
          Getting your location...
        </div>
      )}
      
      {city && (
        <CityWeatherForecast weather={weather} loading={weatherLoading} error={weatherError} />
      )}
    </div>
  );
};

export default WeatherBlock;
