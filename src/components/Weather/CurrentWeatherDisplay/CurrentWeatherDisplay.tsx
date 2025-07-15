import type { Location, CurrentWeather } from '../types';
import './styles.css';

type CurrentWeatherProps = {
  location: Location;
  current: CurrentWeather;
}

const CurrentWeatherDisplay = ({ location, current }: CurrentWeatherProps) => {
  return (
    <div className="current-weather">
      <h2 className="current-weather__title">
        {location.name},<br /> 
        {location.country}
      </h2>
      <div className="current-weather__icon-container">
        <img 
          src={current.condition.icon} 
          alt={current.condition.text}
          className="current-weather__icon"
        />
      </div>
      <div className="current-weather__info">
        <div className="sr-only">Current temperature</div>
        <span className="current-weather__temperature">{Math.round(current.temp_c)}°C</span>
        <span className="current-weather__condition">{current.condition.text}</span>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
