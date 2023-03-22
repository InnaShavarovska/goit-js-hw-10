const URL = 'https://restcountries.com/v3.1/name/'
const fields = 'fields=name,capital,population,flags,languages'

export function fetchCountries(name) {
   return fetch(`${URL}${name}?${fields}`).then(responce => responce.json()).catch(error => console.log(error))
}