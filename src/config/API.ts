import _ from 'lodash';

const API_DOMAIN = 'http://127.0.0.1:8000' //test on localhost

const API = {
  CATEGORY: '/categories/',
};

interface API {
    DOMAIN: string,
}

_.forEach(API, (val, index) => {
    API[index] = API_DOMAIN + val;
  });
  
  API.DOMAIN = API_DOMAIN;
  
export default API;