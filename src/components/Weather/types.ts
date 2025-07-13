export type WeatherData = {
    location: {
        name: string
        country: string
    }
    current: {
        temp_c: number
        condition: {
            text: string
            icon: string
        }
    }
    forecast: {
        forecastday: {
            date: string
            day: {
                avgtemp_c: number
                condition: {
                    text: string
                    icon: string
                }
            }
        }[]
    }
}

export type CityWeatherForecastProps = {
    city: string
}

export type CurrentWeatherProps = {
    location: { name: string; country: string }
    current: {
        temp_c: number
        condition: { text: string; icon: string }
    }
}

export type ForecastDayProps = {
    date: string
    day: {
        avgtemp_c: number
        condition: { text: string; icon: string }
    }
}

export type ForecastDisplayProps = {
    forecast: {
        date: string
        day: {
            avgtemp_c: number
            condition: { text: string; icon: string }
        }
    }[]
}