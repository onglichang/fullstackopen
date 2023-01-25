import Country from './country'

const Information = ({countries}) => {
    return (
        <>
            {countries.length === 0 ?
            null :
            countries.length === 1 ? 
            <Country country={countries[0]}></Country> :
            countries.length > 10 ?
            <div>Too many matches, specify another filter</div> :
            countries.map((country) => (
            <div key={country.name.official}>{country.name.common}{" "}</div>
            ))}  
        </> 
    )
}

export default Information