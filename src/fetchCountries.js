const СOUNTRIES_DATABASE = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages,currencies';

export function fetchCountries(сountryName) {
  return fetch(`${СOUNTRIES_DATABASE}${сountryName}?${fields}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}
