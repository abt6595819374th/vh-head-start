import type { CurrentWeatherProps } from './types'

const CurrentWeatherDisplay = ({ location, current }: CurrentWeatherProps) => {
    return (
        <>
            <h2>
                Weather in {location.name}, {location.country}
            </h2>
            <p>
                <img src={current.condition.icon} alt={current.condition.text} />
                {current.temp_c}°C – {current.condition.text}
            </p>
        </>
    )
}

export default CurrentWeatherDisplay
