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
        {forecast.map((day) => (
          <ForecastDay key={day.date} date={day.date} day={day.day} />
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
