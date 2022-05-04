import _ from 'lodash';

const API_DOMAIN = 'http://192.168.1.13:8000' //test on localhost

const API = {
  CATEGORY: '/categories/',
  PRODUCT: '/products/',
  PRODUCT_BY_CATEGORY: '/categories/id/product/',
  PRODUCT_BY_ID: '/products/id',
  LOGIN: '/o/token/'
};

interface API {
    DOMAIN: string,
}

_.forEach(API, (val, index) => {
    API[index] = API_DOMAIN + val;
  });
  
  API.DOMAIN = API_DOMAIN;
  
export default API;