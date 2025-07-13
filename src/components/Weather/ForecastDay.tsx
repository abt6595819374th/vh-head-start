import type { ForecastDayProps } from './types'

const ForecastDay = ({ date, day }: ForecastDayProps) => {
    return (
        <div
            style={{
                minWidth: '100px',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '0.5rem',
                flex: '1 0 100px',
            }}
        >
            <div style={{ fontWeight: 'bold' }}>
                {new Date(date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                })}
            </div>
            <img
                src={day.condition.icon}
                alt={day.condition.text}
                title={day.condition.text}
            />
            <div>{day.avgtemp_c}°C</div>
            <div>{day.condition.text}</div>
        </div>
    )
}

export default ForecastDay
