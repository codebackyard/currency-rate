import axios from 'axios';

const COUNTRY_URL = 'https://restcountries.eu/rest/v2/all';

export const GetCountries = async () => {
  return axios.get(COUNTRY_URL);
};
