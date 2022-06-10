import _ from 'lodash';

const API_DOMAIN = 'http://192.168.1.13:8000' //test on localhost

const API = {
  CATEGORY: '/categories/',
  PRODUCT: '/products/',
  PRODUCT_BY_CATEGORY: '/categories/id/product/',
  PRODUCT_BY_ID: '/products/id/',
  LOGIN: '/o/token/',
  SIGN_UP: '/users/',
  GET_CURRENT_USER: '/users/current-user/',
  BOOKMARK: '/bookmark/',
  BOOKMARK_BY_USER: '/bookmark/getBookmarkByUser/',
  ADD_NEW_BOOKMARK: '/bookmarkDetail/addBookmark/',
  DELETE_BOOKMARK: '/bookmarkDetail/deleteBookmark/id/',
  GET_ALL_PAYMENT_METHOD: '/stripe/get_payment_method',
  GET_STRIPE_CUSTOMER: '/stripe/get_stripe_costumer',
  UPDATE_DEFAULT_PAYMENT: '/stripe/update_default_payment'
};

interface API {
    DOMAIN: string,
}

_.forEach(API, (val, index) => {
    API[index] = API_DOMAIN + val;
  });
  
  API.DOMAIN = API_DOMAIN;
  
export default API;