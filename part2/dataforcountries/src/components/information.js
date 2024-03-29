import Country from './country'

const Information = ({countries, setCountries}) => {
    if (!countries) {
        return null
    }

    if (countries.length === 1) {
        return <Country country={countries[0]}></Country>
    } else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else {
        return countries.map((country) => 
            (
                <div key={country.name.official}>
                    {country.name.common}{" "}
                    <button onClick={() => setCountries([country])}>show</button>
                </div>
            )
        )
    }
}

export default Information