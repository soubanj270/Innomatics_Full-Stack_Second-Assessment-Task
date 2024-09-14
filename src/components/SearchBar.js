import React, { useState, useEffect } from 'react';
import countries from '../data/countries.json'; // Adjust the path if needed

const CountryFinder = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [chosenCountry, setChosenCountry] = useState(null);

  useEffect(() => {
    if (query === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = countries.filter((entry) =>
        entry.country.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setChosenCountry(null); // Reset chosen country when typing
  };

  const selectCountry = (entry) => {
    setChosenCountry(entry);
    setQuery(entry.country); // Set the input to the selected country
    setSuggestions([]); // Clear the suggestions after selection
  };

  return (
    <div>
      <label htmlFor="country-finder">Search for a country:</label>
      <input
        type="text"
        id="country-finder"
        value={query}
        onChange={handleQueryChange}
        placeholder="Start typing a country"
      />

      {suggestions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', padding: '0', margin: '0', listStyle: 'none' }}>
          {suggestions.map((entry, idx) => (
            <li
              key={idx}
              onClick={() => selectCountry(entry)}
              style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}
            >
              {entry.country}
            </li>
          ))}
        </ul>
      )}

      {chosenCountry && (
        <div>
          <h3>Capital: {chosenCountry.capital}</h3>
        </div>
      )}
    </div>
  );
};

export default CountryFinder;