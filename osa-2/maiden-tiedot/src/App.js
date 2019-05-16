import React, { useState, useEffect }  from 'react';
import axios from 'axios';

const CountryDetails = ({name, capital, population, languages, flag}) => {
  return <div>
      <h2>{name}</h2>
      <p>
        capital {capital} <br />
        population {population}
      </p>
      <p/>
      languages <ul>{languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
      <p/>
      <img src={flag} alt={name} width="150px"/>
    </div>
}

const FilteredCountries = ({countries, filter}) => {
  const filtered = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filtered.length === 1) {
    const {name, capital, population, languages, flag} = filtered[0]
    return <CountryDetails name={name} capital={capital} population={population} languages={languages} flag={flag}/>
  } else {
    return filtered.map(c => <p key={c.name}>{c.name}</p>)
  }
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))},
    [])

  return (
    <div>
      <div>find countries <input value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}/></div>
      <FilteredCountries countries={countries} filter={countryFilter}/>
    </div>
  );
}

export default App;
