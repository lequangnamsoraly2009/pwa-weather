import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}

export const getCity = async (query) => {
    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: query,
            limit: 5,
            APPID: API_KEY,
        }
    });

    return data;
}

export const getWeatherFromCity = async (lat, lon) => {
    const { data } = await axios.get(URL, {
        params: {
            lat: lat,
            lon: lon,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}

export const getHourlyForecastFromCity = async (lat, lon) => {
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/forecast/daily", {
        params: {
            lat: lat,
            lon: lon,
            cnt: 1,
            APPID: API_KEY,
        }
    });

    return data;
}