import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener(
  'input',
  debounce(onCountryInputType, DEBOUNCE_DELAY)
);

function onCountryInputType() {
  const typedName = countryInput.value.trim();
  if (typedName === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }

  fetchCountries(typedName)
    .then(countries => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      console.log(countries);
      if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', getCountryList(countries));
        countryInfo.insertAdjacentHTML('beforeend', getCountryInfo(countries));
      } else if (countries.length >= 10) {
        onTooManyMatches();
      } else {
        countryList.insertAdjacentHTML('beforeend', getCountryList(countries));
      }
    })
    .catch(onWrongNameType);
}

function getCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-element">
              <img src="${flags.svg}" alt="${flags.alt}" width = 30px height = 30px>
              <h2>${name.official}</h2>
          </li>
          `;
    })
    .join('');
  return markup;
}

function getCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages, currencies }) => {
      return `
        <ul>
            <li><p><b>Capital: </b>${capital}</p></li>
            <li><p><b>Population: </b>${population}</p></li>
            <li><p><b>Languages: </b>${Object.values(languages).join(
              ', '
            )}</p></li>
            <li><p><b>Currency: </b>${Object.keys(currencies).join(
              ', '
            )}</p></li>
        </ul>
        `;
    })
    .join('');
  return markup;
}

function onWrongNameType() {
  const wrongName = countryInput.value;

  Notiflix.Notify.failure(
    `Oops, there is no country with that name '${wrongName}'`
  );
}

function onTooManyMatches() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
