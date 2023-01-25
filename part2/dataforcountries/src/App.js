import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Information from './components/information'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setAllCountries(response.data)
        console.log("promise fulfilled")
      })
  }, [])

  const handleFilterChange = (event) => {
    const filterChars = event.target.value
    setFilter(filterChars)
    if (filterChars) {
      setCountries(
        allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(filterChars.toLowerCase())
        )
      )
    } else {
      setCountries([])
    }
  }

  return (
    <div>
      <Filter filter={filter} eventHandler={handleFilterChange}/>
      <Information countries={countries} setCountries={setCountries}/>
    </div>
  )
}

export default App;
