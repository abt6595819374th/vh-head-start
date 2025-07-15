import type { ForecastDayData } from '../types';
import ForecastDay from '../ForecastDay';
import './styles.css';

type ForecastDisplayProps = {
  forecast: ForecastDayData[];
};

const ForecastDisplay = ({ forecast }: ForecastDisplayProps) => {
  return (
    <div className="forecast-display">
      <div className="forecast-display__grid">
        <div className="sr-only">{forecast.length}-day forecast</div>
        {forecast.map((day) => (
          <ForecastDay key={day.date} date={day.date} day={day.day} />
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
