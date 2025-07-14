import CurrentWeatherDisplay from '../CurrentWeatherDisplay';
import ForecastDisplay from '../ForecastDisplay';
import useWeatherData from '../hooks/useWeatherData';
import './styles.css';

type CityWeatherForecastProps = {
  city: string;
}

const CityWeatherForecast = ({ city }: CityWeatherForecastProps) => {
  const { weather, loading, error } = useWeatherData(city);

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
