export type WeatherCondition = {
  text: string;
  icon: string;
};

export type Location = {
  name: string;
  country: string;
};

export type CurrentWeather = {
  temp_c: number;
  condition: WeatherCondition;
};

export type ForecastDay = {
  maxtemp_c: number;
  mintemp_c: number;
  condition: WeatherCondition;
};

export type ForecastDayData = {
  date: string;
  day: ForecastDay;
};

export type Forecast = {
  forecastday: ForecastDayData[];
};

export type WeatherData = {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
};
