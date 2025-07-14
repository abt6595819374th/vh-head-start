import type { WeatherData } from '../types';
import CurrentWeatherDisplay from '../CurrentWeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import './styles.css';

type CityWeatherForecastProps = {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const CityWeatherForecast = ({ weather, loading, error }: CityWeatherForecastProps) => {

  if (loading) return <div className="city-weather-forecast__loading">Loading weather...</div>;
  if (error) return <div className="city-weather-forecast__error">Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="city-weather-forecast">
      <CurrentWeatherDisplay location={weather.location} current={weather.current} />
      <ForecastDisplay forecast={weather.forecast.forecastday} />
    </div>
  );
};

export default CityWeatherForecast;
