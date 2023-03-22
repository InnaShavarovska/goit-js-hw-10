import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInfo.addEventListener('input', debounce(onInputClick, DEBOUNCE_DELAY));

let searchName = '';

function onInputClick(event) {
	event.preventDefault();
	searchName = countryInput.value.trim();

	if(searchName === '') {
		countryInfo.innerHTML = '';
		countryList.innerHTML = '';
		return;
	} 
	fetchCountries(searchName).then(countries =>  {
	   if (countries.length > 1) {
		  countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
        countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
	  } else if (countries.length > 10) {
		countryInfo.innerHTML = '';
		countryList.innerHTML = '';
		Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
	  } else {
		countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
	  };
 })
	  .catch(() => {
		countryInfo.innerHTML = '';
		countryList.innerHTML = '';
	  Notiflix.Notify.failure('Oops, there is no country with that name.');
 });
};


function renderCountryInfo(countries) {
	countryInfo.innerHTML = '';
	countryList.innerHTML = '';
	
	const readyCard = countries.map(({ capital, population, languages }) => {
		return `
		<ul class="country-card">
			 <li class="country-card--item">Capital: <span class="country-value">${capital}</span></li>
			 <li class="country-card--item">Population: <span class="country-value">${population}</span></li>
			 <li class="country-card--item">Languages: <span class="country-value">${Object.values(languages).join(',')}</span></li>
  </ul>`
	}) .join("");
	return readyCard; 
};

function renderCountryList(countries) {
	countryInfo.innerHTML = '';
	countryList.innerHTML = '';
	const readyList = countries.map(({ name, flags }) => {
		return  `<li class="country-list--item">
			  <img src="${flags.svg}" alt="Country flag" width="40", height="30">
			  <span class="country-list--name">${name.official}</span>
		 </li>`})
		 .join("");
	return readyList;
};

