import React, { useState } from 'react';

import { fetchWeather, getCity, getHourlyForecastFromCity, getWeatherFromCity } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [listCity, setListCity] = useState([]);

    const search = async (e) => {
        if(e.key === 'Enter') {
            setListCity([]);
            await fetchWeather(query).then((data) => {
              setWeather(data);
            }).catch((err) => {
              setWeather({});
            });
            setQuery('');
        }
    }

    const searchCity = async (city) => {
      setListCity([]);
      await getCity(city).then((data) => {
        console.log("data", data)
        setListCity(data);
      }).catch(() => {
        setListCity([]);
      });
    }

    const onClickSearchCityByLocation = async (lat, lon) => {
      await getHourlyForecastFromCity(15.6,213.2).then((data) => {
        console.log("test", data)
      })
      await getWeatherFromCity(lat, lon).then((data) => {
        setWeather(data);
        setListCity([]);
      }).catch((err) => {
        setWeather({});
        setListCity([]);
      });
      setQuery('');
    }

    return (
      <div>
        <div>
          <button>Search Temperature</button>
          <button>Search Hourly Forecast</button>
        </div>
        <div className="main-container">
            <input type="text" className="search" onClick={() => {
              setWeather({});
            }} placeholder="Search..." value={query} onChange={(e) => {
              setQuery(e.target.value);
              searchCity(e.target.value)
            }} onKeyPress={search}/>
            {listCity.length > 0 && (
              <div className='list-city'>
                {listCity.map((item) => (
                  <div key={`${item.name}-${item.country}`} className='city-item' onClick={() => {onClickSearchCityByLocation(item.lat, item.lon)}}>
                      {item.name} - {item.country}
                  </div>
                ))}
              </div>
            )}
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
}

export default App;