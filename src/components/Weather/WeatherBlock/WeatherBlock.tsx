import { useState, useEffect } from 'react';
import CityWeatherForecast from '../CityWeatherForecast';
import SearchIcon from '../SearchIcon';
import useGeolocation from '../hooks/useGeolocation';
import useLocationCity from '../hooks/useLocationCity';
import './styles.css';

const WeatherBlock = () => {
  const [city, setCity] = useState('Amsterdam');
  const [searchInput, setSearchInput] = useState('');
    
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  const { city: locationCity, loading: cityLoading } = useLocationCity(latitude, longitude);

  useEffect(() => {
    if (locationCity && !locationError) {
      setCity(locationCity);
    }
  }, [locationCity, locationError]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  return (
    <div className="weather-block">
      {(locationLoading || cityLoading) && (
        <div className="weather-block__loading">
          Getting your location...
        </div>
      )}
            
      {locationError && (
        <div className="weather-block__error">
          {locationError}. Using default location.
        </div>
      )}
            
      <form onSubmit={handleSearch} className="weather-block__form">
        <div className="weather-block__input-container">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city"
            className="weather-block__input"
          />
          <button
            type="submit"
            className="weather-block__search-icon"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      <CityWeatherForecast city={city} />
    </div>
  );
};

export default WeatherBlock;
