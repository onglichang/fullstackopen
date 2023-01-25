import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (filter.length == 0) {

    } else {
    axios
      .get("https://restcountries.com/v3.1/name/" + filter)
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
    }
  }, [filter])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange}/>
      </div>
    </>
  )
}

export default App;
