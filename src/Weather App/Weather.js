import { useState } from 'react'
import './Weather.css'
import PulseLoader from "react-spinners/PulseLoader";

const api = {
  key: "2a35c85bdb8169efe31237ccb7b54817",
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  function search() {
    setLoading(true)
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        setError(true)
        setLoading(false);
      });
  }
  return (
    <div className='sec'>
      <section className='sec2'>
        <div className='sec-content'>
          <h1>Weather App</h1>
          <input type={'text'} placeholder='Enter your city name' onChange={(e) => setCity(e.target.value)}></input>
          <br></br>
          <button className='button' onClick={search}>Search</button>
          <PulseLoader color="white" loading={loading} size={30} />
        </div>
        {!loading && !error && <div>
          {(typeof weather.main !== "undefined"
          ) ? (
            <div className='cards'>
              <p className='city'>City Name: <b>{weather.name}, {weather.sys.country}</b></p>
              <div className='contents'>
                <p>Temp: <b>{weather.main.temp}</b> <i class="fa-solid fa-temperature-high"></i></p>
                <p>Clouds/Rain: <b>{weather.weather[0].description}</b> <i class="fa-solid fa-cloud"></i></p>
                <p>Wind Speed: <b>{weather.wind.speed}</b> <i class="fa-solid fa-gauge"></i></p>
                <p>Humidity: <b>{weather.main.humidity}</b> <i class="fa-solid fa-droplet"></i></p>
                <p>Pressure: <b>{weather.main.pressure}</b> <i class="fa-solid fa-gauge"></i></p>
                <p>Country: <b>{weather.sys.country}</b> <i class="fa-solid fa-location-dot"></i></p>
              </div>
            </div>) : (<div className='error'><p>{`${weather.message}!!! 😣`}</p></div>)}
        </div>}
      </section>

    </div>
  )
}

export default App