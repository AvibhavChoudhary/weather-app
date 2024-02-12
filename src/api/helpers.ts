import { API_KEY, BASE_URL } from "../utils/constant";

export const getDailyForecast = async ({ lat, long, metric }) => {
  const forecastResult = await fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${metric}`,
  );
  const data = await forecastResult.json();
  return data.list;
};

export const getCurrentWeather = async ({ lat, long, metric }) => {
  const results = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${metric}`,
  );
  const data = await results.json();
  return data;
};

export const getPlaces = async ({ searchString, limit }) => {
  const results = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${searchString}&limit=${limit}&appid=${API_KEY}`,
  );
  const data = await results.json();
  return data;
};


