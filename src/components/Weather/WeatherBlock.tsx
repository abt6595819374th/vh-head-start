import { useState, useEffect } from 'react'
import CityWeatherForecast from './CityWeatherForecast.tsx'
import useGeolocation from './hooks/useGeolocation'
import useLocationCity from './hooks/useLocationCity'

const WeatherBlock = () => {
    const [city, setCity] = useState('Amsterdam')
    const [searchInput, setSearchInput] = useState('')
    
    const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation()
    const { city: locationCity, loading: cityLoading } = useLocationCity(latitude, longitude)

    useEffect(() => {
        if (locationCity && !locationError) {
            setCity(locationCity)
        }
    }, [locationCity, locationError])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchInput.trim()) {
            setCity(searchInput.trim())
        }
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Weather App</h1>
            
            {(locationLoading || cityLoading) && (
                <div style={{ marginBottom: '1rem', color: '#666', fontStyle: 'italic' }}>
                    Getting your location...
                </div>
            )}
            
            {locationError && (
                <div style={{ marginBottom: '1rem', color: '#dc3545', fontSize: '0.9rem' }}>
                    {locationError}. Using default location.
                </div>
            )}
            
            <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Enter city name..."
                        style={{
                            padding: '0.5rem',
                            fontSize: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            flex: 1,
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '1rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>
                </div>
            </form>

            <CityWeatherForecast city={city} />
        </div>
    )
}

export default WeatherBlock