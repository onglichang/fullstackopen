import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Country from './components/country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filterChars = event.target.value
    setFilter(filterChars)
    setCountries(
      allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(filterChars.toLowerCase())
      )
    )
  }

  return (
    <div>
      <Filter filter={filter} eventHandler={handleFilterChange}/>
      {countries.length > 10 ? 
      (<div>Too many matches, specify another filter</div>) :
      null} 
      {countries.length > 1 && countries.length < 10 ? 
      countries.map((country) => (
        <div key={country.name.official}>{country.name.common}{" "}</div>
        )) :
      null} 
      {countries.length === 1 ? 
      <Country country={countries[0]}></Country> :
      null} 
    </div>
  )
}

export default App;
