/**
 * @vitest-environment jsdom
 * Required for React Testing Library to work - needs DOM environment
 */
import { describe, expect, test, vi, type MockedFunction } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherBlock from './WeatherBlock';
import type { WeatherData } from '../types';
import useWeatherData from '../hooks/useWeatherData';

// Mock the custom hooks
vi.mock('../hooks/useGeolocation', () => ({
  default: vi.fn(() => ({
    latitude: null,
    longitude: null,
    loading: false,
    error: null
  }))
}));

vi.mock('../hooks/useLocationCity', () => ({
  default: vi.fn(() => ({
    city: null,
    loading: false
  }))
}));

vi.mock('../hooks/useWeatherData', () => ({
  default: vi.fn(() => ({
    weather: null,
    loading: false,
    error: null
  }))
}));

const weatherData: WeatherData = {
  location: {
    name: 'London',
    country: 'United Kingdom',
  },
  current: {
    temp_c: 22,
    condition: {
      text: 'Sunny',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
    },
  },
  forecast: {
    forecastday: [
      {
        date: '2024-01-01',
        day: {
          maxtemp_c: 25,
          mintemp_c: 18,
          condition: {
            text: 'Sunny',
            icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
          },
        },
      },
    ],
  },
};

describe('WeatherBlock', () => {
  test('should handle search form submission and update city', async () => {
    const mockUseWeatherData = await import('../hooks/useWeatherData');
    const useWeatherDataMock = mockUseWeatherData.default as MockedFunction<typeof useWeatherData>;
    
    // Track calls to useWeatherData to verify city updates
    const weatherDataCalls: string[] = [];
    useWeatherDataMock.mockImplementation((city: string | null) => {
      if (city) {
        weatherDataCalls.push(city);
        return {
          weather: weatherData,
          loading: false,
          error: null
        };
      }
      return {
        weather: null,
        loading: false,
        error: null
      };
    });

    render(<WeatherBlock />);

    // Verify initial render with no city selected
    expect(screen.getByPlaceholderText('Search for a city or airport')).toBeTruthy();
    expect(screen.getByLabelText('Search')).toBeTruthy();
    
    // Verify no city message is shown
    expect(screen.getByText('Search for a city or airport to see weather information, or allow location access to get weather for your current location.')).toBeTruthy();

    // Find the search input and enter a city
    const searchInput = screen.getByPlaceholderText('Search for a city or airport');
    fireEvent.change(searchInput, { target: { value: 'London' } });
    
    // Verify input value changed
    expect((searchInput as HTMLInputElement).value).toBe('London');

    // Submit the form
    const searchForm = searchInput.closest('form');
    fireEvent.submit(searchForm!);

    // Verify that useWeatherData was called with the new city
    await waitFor(() => {
      expect(weatherDataCalls).toContain('London');
    });

    // Verify the component shows the new city name and weather data
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toContain('London');
    expect(heading.textContent).toContain('United Kingdom');
    
    // Verify London weather data is shown
    expect(screen.getByText('22°C')).toBeTruthy();
    expect(screen.getByText('Sunny')).toBeTruthy();
    
    // Verify no city message is no longer shown
    expect(screen.queryByText('Search for a city to see weather information, or allow location access to get weather for your current location.')).toBeFalsy();
  });
});
