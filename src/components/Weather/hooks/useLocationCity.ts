import { useState, useEffect } from 'react';

type LocationCityState = {
    city: string | null
    loading: boolean
    error: string | null
}

const useLocationCity = (latitude: number | null, longitude: number | null) => {
  const [state, setState] = useState<LocationCityState>({
    city: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    const fetchLocationCity = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
                
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${
            import.meta.env.PUBLIC_WEATHER_API_KEY
          }&q=${latitude},${longitude}&aqi=no`
        );
                
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data = await response.json();
        setState({
          city: data.location.name,
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        }));
      }
    };

    fetchLocationCity();
  }, [latitude, longitude]);

  return state;
};

export default useLocationCity;
