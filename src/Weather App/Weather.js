import { useState } from 'react';
import './Weather.css';
import PulseLoader from 'react-spinners/PulseLoader';

const api = {
  key: "2a35c85bdb8169efe31237ccb7b54817",
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {
  const [weather, setWeather] = useState(null); // Initial state is null
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Use null for no error

  function search() {
    if (!city) return; // Do nothing if city is empty

    setLoading(true);
    setError(null); // Reset error before making a new request

    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === "404") {
          setError(data.message);
          setWeather(null); // Reset weather data on error
        } else {
          setWeather(data);
          setError(null); // Clear any previous errors
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data. Please try again.');
        setWeather(null); // Reset weather data on error
        setLoading(false);
      });
  }

  return (
    <div className='sec'>
      <section className='sec2'>
        <div className='sec-content'>
          <h1>🚀🌦️ Your Perfect Weather App! 🌦️🚀</h1>
          <h3>✨🌈 Live Updates & Forecasts Right Here! 🌧️✨</h3>
          <input
            type='text'
            placeholder='Enter your city name'
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <br />
          <button className='button' onClick={search}>Search</button>
          <PulseLoader color="white" loading={loading} size={30} />
        </div>
        {loading && !error && <div className='loading'><p>Loading...</p></div>}
        {error && !loading && <div className='error'><p>{`${error} 😣`}</p></div>}
        {!loading && !error && weather && weather.main && (
          <div className='cards'>
            <p className='city'>City Name: <b>{weather.name}, {weather.sys.country}</b></p>
            <div className='contents'>
              <p>Temp: <b>{weather.main.temp}°C</b> <i className="fa-solid fa-temperature-high"></i></p>
              <p>Clouds/Rain: <b>{weather.weather[0].description}</b> <i className="fa-solid fa-cloud"></i></p>
              <p>Wind Speed: <b>{weather.wind.speed} m/s</b> <i className="fa-solid fa-gauge"></i></p>
              <p>Humidity: <b>{weather.main.humidity}%</b> <i className="fa-solid fa-droplet"></i></p>
              <p>Pressure: <b>{weather.main.pressure} hPa</b> <i className="fa-solid fa-gauge"></i></p>
              <p>Country: <b>{weather.sys.country}</b> <i className="fa-solid fa-location-dot"></i></p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default App;
