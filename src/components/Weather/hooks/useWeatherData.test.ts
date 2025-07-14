/**
 * @vitest-environment jsdom
 * Required for React Testing Library's renderHook to work - needs DOM environment
 */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { WeatherData } from '../types';
import createFetchMock from 'vitest-fetch-mock';
import useWeatherData from './useWeatherData';

// Create fetch mock instance
const fetchMock = createFetchMock(vi);

// Enable fetch mocking
fetchMock.enableMocks();

const mockWeatherData: WeatherData = {
  location: {
    name: 'Amsterdam',
    country: 'Netherlands',
  },
  current: {
    temp_c: 20,
    condition: {
      text: 'Partly cloudy',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
    },
  },
  forecast: {
    forecastday: [
      {
        date: '2024-01-01',
        day: {
          maxtemp_c: 22,
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

beforeEach(() => {
  vi.clearAllMocks();
  // fetchMock is globally available after enableFetchMocks()
  fetchMock.resetMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('useWeatherData', () => {
  test('should handle URL encoding for city names', async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockWeatherData));
    
    renderHook(() => useWeatherData('São Paulo'));
    
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('q=S%C3%A3o%20Paulo')
      );
    });
    
    const actualUrl = fetchMock.mock.calls[0][0] as string;
    const url = new URL(actualUrl);
    expect(url.searchParams.get('q')).toBe('São Paulo'); // URL constructor automatically decodes
  });

  test('should handle successful API response', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockWeatherData));
    const { result } = renderHook(() => useWeatherData('Amsterdam'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.weather).toEqual(mockWeatherData);
    expect(result.current.error).toBe(null);
  });

  test('should handle API error', async () => {
    // Mock 404 response
    fetchMock.mockResponseOnce({ status: 404 });
    
    const { result } = renderHook(() => useWeatherData('NotFound'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.weather).toBe(null);
    expect(result.current.error).toBe('Failed to fetch weather data');
  });
});
