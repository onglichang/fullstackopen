import axios from 'axios'
import { useEffect, useState } from "react";

const WeatherData = ({city}) => {
    const [weather, setWeather] = useState([])
    // const [lat, setLat] = useState("")
    // const [lon, setLon] = useState("")
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log("start here", {city}, api_key)
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
        .then(response => {
            const lat = response.data[0].lat
            const lon = response.data[0].lon
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            // setLat(response.data[0].lat.toString())
            // setLon(response.data[0].lon.toString())
            // console.log(data[0].lat)
        })
        .then(response => {
            setWeather(response.data)
            console.log('done')
        })
    }, [])

    // useEffect(() => {
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    //     .then(response => {
    //     setWeather(response.data)
    //     console.log(weather)
    //     })
    // }, [lat, lon])


    return(
        <>
            <h2>Weather in {city}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            <p>wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default WeatherData