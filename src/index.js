import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onInputClick, DEBOUNCE_DELAY));

let searchName = '';

function onInputClick() {

	searchName = countryInput.value.trim();

	if(searchName === '') {
		countryInfo.innerHTML = '';
		countryList.innerHTML = '';
		return;
	} 
	fetchCountries(searchName).then(countries =>  {
		if (countries.length > 10) {
			Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
		  } else if (countries.length >=2 && countries.length <= 10) {
         	countryInfo.innerHTML = '';
		      countryList.innerHTML = '';
				countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
		  } else {
			countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
		  }
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
	
	const readyCard = countries.map(({ name, flags, capital, population, languages }) => {
		return `
		<div class="country__flag">
		<img class="country__img" src="${flags.svg}" alt="flag">
		<p class="country__name">${name.official}</p>
	 </div>
		<ul class="country-info">
			 <li class="country-info__item">Capital: <span class="country__value">${capital}</span></li>
			 <li class="country-info__item">Population: <span class="country__value">${population}</span></li>
			 <li class="country-info__item">Languages: <span class="country__value">${Object.values(languages).join(',')}</span></li>
  </ul>`
	}) .join("");
	return readyCard; 
};

function renderCountryList(countries) {
	countryInfo.innerHTML = '';
	countryList.innerHTML = '';
	const readyList = countries.map(({ name, flags }) => {
		return  `<li class="country-list__item">
			  <img class="country-list__img" src="${flags.svg}" alt="Country flag" width="40", height="30">
			  <p class="country-list__text">${name.official}</p>
		 </li>`})
		 .join("");
	return readyList;
};

