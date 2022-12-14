import './css/styles.css';
import countri from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {input,list,info} from './refs';

const DEBOUNCE_DELAY = 300;

 input.addEventListener('input', debounce(onInpute, DEBOUNCE_DELAY));


function onInpute(e) {
 const name = e.target.value.trim();
 if (name === '') {
  clearInput();
  return;
 }
 countri.fetchCountries(name)
 .then(renderCountry)
 .catch(onCatchError)
};

 function renderCountry(country) {
  clearInput();
 
 if (country.length >= 11) {
  clearInput();
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
return; 
} else if (country.length === 1) {
  clearInput();
  const infoCountries = country.map(({name, capital, population, flags, languages}) => {
    let lang = ''
    for (let key in languages) {
      lang = languages[key];
  }
    return `
    <div class="country-info-name">
    <ul class="country-list"><li class="country-name"><img src="${flags.svg}" alt="flag" width='35' height ='15' >${name.official}</li></ul>
    <p>Сapital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${lang}</p>
    </div>
    `;
  }).join("");
  info.insertAdjacentHTML('beforeend', infoCountries);
  return;
 } else {
  clearInput();
  const listName = country.map(({name, flags}) => {
    return `
    <li><img src="${flags.svg}" alt="flag" width='35' height ='15' >${name.official}</li>
    `;
  }).join("");

 console.log(listName)
 list.insertAdjacentHTML('beforeend', listName);
}
 };


 function onCatchError(error) {
  if (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
 };

 function clearInput() {
  list.innerHTML = "";
  info.innerHTML = "";
 };