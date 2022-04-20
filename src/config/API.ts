import _ from 'lodash';

const API_DOMAIN = 'localhost:8000' //test on localhost

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
  