import React, { useState, useEffect }  from 'react';
import axios from 'axios';

const FilteredCountries = ({countries, filter}) => {
  const filtered = countries.filter(c => c.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else {
    return filtered.map(c => <p key={c}>{c}</p>)
  }
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data.map(o => o.name)))},
    [])

  return (
    <div>
      <div>find countries <input value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}/></div>
      <FilteredCountries countries={countries} filter={countryFilter}/>
    </div>
  );
}

export default App;
