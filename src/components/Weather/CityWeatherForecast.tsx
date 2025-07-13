import type { CityWeatherForecastProps } from './types'
import CurrentWeatherDisplay from './CurrentWeatherDisplay'
import ForecastDisplay from './ForecastDisplay'
import useWeatherData from './hooks/useWeatherData'

const CityWeatherForecast = ({ city }: CityWeatherForecastProps) => {
    const { weather, loading, error } = useWeatherData(city)

    if (loading) return <div>Loading weather...</div>
    if (error) return <div>Error: {error}</div>
    if (!weather) return null

    return (
        <div className="weather-block">
            <CurrentWeatherDisplay location={weather.location} current={weather.current} />
            <ForecastDisplay forecast={weather.forecast.forecastday} />
        </div>
    )
}

export default CityWeatherForecast
