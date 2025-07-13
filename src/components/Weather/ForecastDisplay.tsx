import type { ForecastDisplayProps } from './types'
import ForecastDay from './ForecastDay'

const ForecastDisplay = ({ forecast }: ForecastDisplayProps) => {
    return (
        <>
            <h3>5-Day Forecast</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {forecast.map((day) => (
                    <ForecastDay key={day.date} date={day.date} day={day.day} />
                ))}
            </div>
        </>
    )
}

export default ForecastDisplay
