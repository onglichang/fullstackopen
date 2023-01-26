import axios from 'axios'
import { useEffect, useState } from "react";

const WeatherData = ({city}) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
        .then(response => {
            const lat = response.data[0].lat
            const lon = response.data[0].lon
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        })
        .then(response => {
            setWeather(response.data)
        })
    }, [])

    return(
        <>
            {weather.main ? (
                <div>
                    <h2>Weather in {city}</h2>
                    <p>temperature {weather.main.temp} Celcius</p>
                    <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                    />
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            ) : null}
        </>
    )
}

export default WeatherData