import type { ForecastDayData } from '../types';
import './styles.css';

const ForecastDay = ({ date, day }: ForecastDayData) => {
  return (
    <div className="forecast-day">
      <div className="forecast-day__date">
        {new Date(date).toLocaleDateString('en-GB', {
          weekday: 'short',
        })}
      </div>
      <img
        src={day.condition.icon}
        alt={day.condition.text}
        title={day.condition.text}
        className="forecast-day__icon"
      />
      <div className="forecast-day__min-temperature" title="Lowest temperature">
        <div className="sr-only">Lowest temperature</div>
        {Math.round(day.mintemp_c)}°C
      </div>
      <div className="forecast-day__max-temperature" title="Highest temperature">
        <div className="sr-only">Highest temperature</div>
        {Math.round(day.maxtemp_c)}°C
      </div>
    </div>
  );
};

export default ForecastDay;
